import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { IBadge, IServer, IServerGroup } from 'coh-content-db';
import { IArchetype } from 'coh-content-db/dist/types/archetype';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { oc } from 'ts-optchain';
import { getFileHash, LogLineType, parseLog } from '../../common/log-parser';
import { ContentDbService } from '../../content-db/content-db.service';
import { ICharacter, newCharacter } from '../character';
import { CharacterBadgesPipe } from '../character-badges.pipe';
import { CharacterDbService } from '../character-db.service';
import { CharacterLogParserHowToModalComponent } from '../character-log-parser-how-to-modal/character-log-parser-how-to-modal.component';

type ThenArg<T> = T extends Promise<infer U> ? U :
    T extends ((...args: any[]) => Promise<infer V>) ? V :
        T;

interface FoundBadges {
    [characterName: string]: {
        badges: Array<IBadge>;
        archetypeKey: string;
        server: string;
        character: ICharacter;
    };
}

@Component({
    selector: 'app-character-log-parser-modal',
    templateUrl: './character-log-parser-modal.component.html',
    styleUrls: ['./character-log-parser-modal.component.scss']
})
export class CharacterLogParserModalComponent implements OnInit {
    public dragOver = false;
    public isGeneratingHashes = false;
    public isParsingLogs = false;
    public hasNewFoundBadges = false;
    public hasParsedBadges = false;
    public parsingProgress = 0;

    public characters: ICharacter[] = [];

    public foundBadges: FoundBadges;

    public  fileList: { [hash: string]: File } = {};

    public closeIcon = faTrash;

    public servers: IServer[];
    public archetypes: IArchetype[];

    public selectedServerGroup: IServerGroup;

    get serverGroup(): IServerGroup {
        return this.selectedServerGroup || this.contentDb.getServerGroups()[0];
    }

    set serverGroup(value: IServerGroup) {
        this.selectedServerGroup = value;
        this.servers = oc(this.selectedServerGroup).servers([]);
        this.archetypes = oc(this.selectedServerGroup).archetypes([]);
    }

    private get disableSubmit() {
        return Object.keys(this.fileList).length === 0 || this.isGeneratingHashes || this.isParsingLogs;
    }

    constructor(
        public bsModalRef: BsModalRef,
        private modalService: BsModalService,
        private characterBadgesPipe: CharacterBadgesPipe,
        private contentDb: ContentDbService,
        private charDb: CharacterDbService) {
    }

    public ngOnInit(): void {
        this.charDb.getCharacters().subscribe((characters) => this.characters = characters);
    }

    private openHowTo() {
        this.close();
        this.modalService.show(CharacterLogParserHowToModalComponent, {
        });
    }

    private removeFile(hash: string) {
        delete this.fileList[hash];
    }

    private isNewCharacter(characterName): boolean {
        return this.characters.find(c => c.name === characterName) === undefined;
    }

    private onFileSelect(event: Event) {
        const files = (event.target as HTMLInputElement).files;

        this.fileDropped(files);
    }

    private fileDragEnter() {
        this.dragOver = true;
    }

    private fileDragLeave() {
        this.dragOver = false;
    }

    private async fileDropped($event: FileList) {
        this.isGeneratingHashes = true;
        this.dragOver = false;
        const newFiles = Array.from($event);

        const newFileList = {
            ...this.fileList
        };

        for await (const newFile of newFiles) {
            const hash = await getFileHash(newFile);

            if (newFileList[hash] === undefined) {
                newFileList[hash] = newFile;
            }
        }

        this.fileList = newFileList;

        this.isGeneratingHashes = false;
    }

    private async submit() {
        this.isParsingLogs = true;
        this.parsingProgress = 0;
        const fileList = Object.values(this.fileList);
        const totalFileSize = fileList.reduce((acc, f) => acc + f.size, 0);
        let totalProgress = 0;

        const allLines: ThenArg<typeof parseLog> = [];

        for await (const file of fileList) {
            allLines.push(...await parseLog(file, (progress) => {
                this.parsingProgress = Math.floor(((totalProgress + progress) / totalFileSize) * 100);
            }));
            totalProgress += file.size;
        }

        allLines.sort((a, b) => a.time - b.time);

        this.foundBadges = this.processLines(allLines);

        this.hasParsedBadges = true;
        this.hasNewFoundBadges = Object.keys(this.foundBadges).length > 0;

        this.isParsingLogs = false;
    }

    private processLines(lines: ThenArg<typeof parseLog>): FoundBadges {
        let characterName: string | void;

        const badgeMap: FoundBadges = {};

        for (const line of lines) {
            // on every entry, check what type it is,
            // if it's a badge entry, we will need to have read a login entry first
            // otherwise we won't have a character to add the badge to
            if (line.type === LogLineType.LOGIN) {
                characterName = line.characterName;
                console.debug("Found character", characterName);
                const character = this.characters.find(c => c.name === characterName);

                if (badgeMap[characterName] === undefined) {
                    badgeMap[characterName] = {
                        badges: [],
                        character,
                        archetypeKey: character ? character.archetypeKey : this.serverGroup.archetypes[0].key,
                        server: character ? character.server : this.servers[0].name
                    };
                }
            } else if (line.type === LogLineType.BADGE && typeof characterName === 'string') {
                // find badge by name
                // badges can have multiple names
                const foundBadge = this.selectedServerGroup.badges
                    .find(b =>
                        b.names.map(n => n.value)
                            .includes(line.badgeName));

                if (foundBadge !== undefined
                    // check if a character was found
                    && (badgeMap[characterName].character === undefined
                        // check if a badge entry to the chacater's badge list was found
                        || badgeMap[characterName].character.badges[foundBadge.key] === undefined
                        // check if a character's badge entry is owned
                        || badgeMap[characterName].character.badges[foundBadge.key].owned === false)
                    // check if we've already marked the badge as found
                && badgeMap[characterName].badges.includes(foundBadge) === false) {
                    badgeMap[characterName].badges.push(foundBadge);
                }
            }
        }

        // remove characters without new badges and return the list
        return Object.keys(badgeMap)
            .filter(k => badgeMap[k].badges.length > 0)
            .reduce((acc, k) => ({...acc, [k]: badgeMap[k]}), {});
    }

    private removeCharacter(characterName: string) {
        delete this.foundBadges[characterName];
    }

    private save() {
        for (const characterName in this.foundBadges) {
            if (this.foundBadges.hasOwnProperty(characterName) === false) {
                continue;
            }
            console.debug("Saving badges for character", characterName);

            const obj = this.foundBadges[characterName];
            const character = obj.character || newCharacter(characterName, this.serverGroup.key, obj.server, obj.archetypeKey);

            this.charDb.saveCharacter(character);

            this.charDb.collectBadgeBulk(character, obj.badges, true);
        }

        this.close();
    }

    private close() {
        this.bsModalRef.hide();
    }
}
