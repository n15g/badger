# Badger

Badger is a badge database and tracker application for City of Heroes badge hunters.

### To run the app, just visit the following link, no need to download or run anything: https://n15g.github.io/badger/

I designed badger to solve a couple of issues that have cropped up in the post-sunset era:

* The original badge hunting sites and tools are out of date.
* Much of the old tools are closed source and abandoned.
* There are now multiple server groups running, each with different badges available on their servers.

To that end, Badger is open source.
It is also designed to handle different servers with different badges available.
The badge and server data are also stored in open-source git repositories under the GPL 3.0 and also published to npm, making it easy to use in other applications if you wish.
I actively encourage anyone who wants to use the badge data for other projects to do so.

The currently supported server groups are:

* Homecoming - https://github.com/n15g/coh-content-db-homecoming

If anyone is interested in creating or maintaining the data for other server groups, let me know.

...and of course, happy badging!

Go hunt. Kill Skuls.

## Development

If you'd like to run the app locally for development purposes, here's what you'll need:

### Requirements

* [Node JS](https://nodejs.org/)
* [git](https://git-scm.com/) for source control
* For badge development an understanding of [TypeScript](https://www.typescriptlang.org/)
* For UI development, an understanding of [Angular](https://angular.dev/)

### Running locally

1. Clone the project `git clone git@github.com:n15g/badger.git`
2. Install project dependencies `npm install`
3. Launch the development server `npm run start`

The app will now be accessible at http://localhost:4200.
Most changes will be reflected automatically without needing to restart the server.

### Linking changes from a content database

To test changes to a content database, like the [Homecoming Content DB](https://github.com/n15g/coh-content-db-homecoming), you'll need to
build and link that project locally.

For Homecoming specifically, you can follow the following process:

1. Clone the coh-content-db-homecoming repo: `git clone git@github.com:n15g/coh-content-db-homecoming.git`
2. From the coh-content-db-homecoming folder:
    1. Run `npm link`
    2. Make your changes to the content.
    3. Run `npm build` or `npm watch` to build automatically on changes.
3. From the badger folder:
    1. Run `npm run link:hc` to link to your local changes in the coh-content-db-homecoming folder.
    2. Run `npm run start` to start the development server and see your changes reflected in the UI.

### Updating the package version

Use [Semantic Versioning](https://semver.org/).

1. `npm version <new version>`
2. Update the [changelog](src/app/_changelog.ts).

### Building and publish

Build the application bundle and publish to github pages.

1. `npm run build`
2. `npm run pages`

# Updating the Database

Databse is located here: [https://n15g.github.io/badger/](https://n15g.github.io/badger/).

### Needed Tools:

*   GitHub account
    
    *   Badger Database on Github: [https://github.com/n15g/coh-content-db-homecoming](https://github.com/n15g/coh-content-db-homecoming)
        
    *   Badger Website Data on Github: [https://github.com/n15g/badger](https://github.com/n15g/badger)
        
*   City of Heroes account (Any server, but these instructions assume [Homecoming](https://forums.homecomingservers.com/).)
    
*   Pigg Viewer to convert PIGGs to Textures (Piglet linked in [this forum post](https://forums.homecomingservers.com/topic/5405-piggviewer/#comment-562266).)
    
*   DeTexturizer to convert Textures to DDS (Philotic Knight’s is on [GitHub](https://github.com/WestBennett/Old-CoH-Code/).)
    
*   DDS Converter to convert DDS to PNG (many available online)
    
*   Text editor ([Notepad++](https://notepad-plus-plus.org/) recommended)
    
*   Image editing software
    
*   Download [badge-grant-all.txt](docs/badge_grant_all.txt) 
    
*   Download [SetTitle file](https://n15g.github.io/badger/assets/settitle.txt)
    
### Working with GitHub:

1. While logged in to GitHub, visit the Database link above (and optionally the Website Data link). Click the “Fork” button at the top of the page, and select “Create New Fork.” Adjust the options if desired, then click Create Fork. This is your version to work with.

2. When you want to make updates, go to your Fork and click the “Master” drop down menu on the top left. Enter the name of a new Branch where you will make changes (e.g. Issue28Page2). Then click the button that says “Create new branch (name) from master.” You will make changes in this branch, leaving your master version untouched.

3. Once done with all updates, you’ll submit your changes to be merged into the main Database. This must be approved by Nick/KeyboardKitsune, which he usually does within a couple of days. **Ensure all of your changes are 100% correct before asking to merge, to prevent multiple requests.**

4. Each badge is represented by a .ts file located in the src/badge/(category) directories. Each badge category (Accolade, Exploration, etc.) also has a .ts file (e.g. \_accolade-badges.ts) which determines proper sequential display order and must be updated when new badges are added. Badge icon images must be uploaded to the appropriate folder in docs/images/badges.

5. Always coordinate with other people who are updating the database so you don’t overwrite each others’ efforts!

### Info Needed to Add or Update Badges 
(retain screen shots of everything obtained in-game!)

*   Badge Icon Image \[ATC\]
    
*   In-Game Sequential Order \[ATC\]
    
*   Set-Title ID \[ATC\] (from live or open beta only, NOT CLOSED BETA)
    
*   Badge Name (including gender and alignment variants) \[ATC\]
    
*   Badge Text (including gender and alignment variants) \[ATC\]
    
*   Location Coordinates (for Exploration badges and History plaques) \[ATC\]
    
*   ViditotMap Keys (for Exploration badges and History plaques) \[ATC\]
    
*   Badge Category \[ATC\]
    
*   Alignment (based on acquisition, not possession)
    
*   Badge Dependencies (other badges needed for this one, may be in Patch Notes)
    
*   Acquisition Instructions (keep spoilers light & add more detail to notes)
    
*   Notes (from Forums, Wiki, Patch Notes, etc.)
    
*   History Plaque inscription and type (wall or monument)
    
*   Key Name (hero, male, lowercase, no special characters, replace space with dash (snake-case or kebab-case))
    
*   Export Name (hero, male, CamelCase (ProperCase), no special characters or spaces)
    
Items marked with \[ATC\] will be performed by AboveTheChemist for other CoH related tools (VidiotMaps, Badge Popmenu, etc.), and so can be provided to whomever is updating the Badger site.

Some of this information can be gleaned from the Patch Notes, but ALWAYS VERIFY in-game. Patch Notes can be (and often have been) wrong. Example: Patch Notes said new badge was “Hidden in Fog” but actual in-game badge name is “Hidden in the Fog.”

### Obtaining Badge Icon Images: 
ATC can provide. _Only needed if adding a new badge. Skip this section if you’re merely updating an existing badge._

You can easily obtain the image icons for new badges via the patch notes. Right click each image and save to your hard drive. **This method is least-preferred**, as the resulting images may not be the highest possible quality. **Use below method if possible.**

1.  Navigate to your City of Heroes installation directory. If the new badges are still in beta, go to the assets\\beta folder. If the changes are live, you can use the assets\\live folder.
    
2.  Copy all of the .pigg files to a new location (your Sandbox) to prevent any possible corruption of your game files.
    
3.  Use a PIGG viewer to convert the needed PIGG files to textures
    
    1.  Open your Sandbox directory with Piglet
        
    2.  In the left panel, navigate to texture\_library > gui > icons > badges
        
    3.  Reference patch notes to determine what new badges are coming, and therefore what texture files you’re looking for. Select the needed textures in the window on the right and export them to a new folder (Repository)
        
4.  Use a DeTexturizer to convert the texture files to DDS. (This is straight-forward.)
    
5.  Use a DDS converter to convert the DDS files to PNG files. (Ditto)
    
6.  Crop images as needed
    
    1.  Open each image in an image editing program and look closely for extra “tags” that need to be cropped. Typical round badges are 48x48 pixels and often need to be trimmed. See [example-needs-cropped.png](docs/example-needs-cropped.png) in the docs directory for examples.
        
    2.  Crop the top/left 48x48 pixels and save the file, ensuring to retain the transparent background and .png extension.
        
    3.  Other common badge sizes are 64x64, 128x48, and 128x64. Not all icons will need to be cropped, but it will generally be obvious which ones need cropping as seen in the examples, as they will either have excessive whitespace or extra 'tags'. When cropping, always crop to one of the above listed sizes.
        
    4.  Naming convention for badge image files (Key Name):
        
        1.  All lower case, replace spaces with dash (snake-case)
            
        2.  Use the Male version of the badge name, if there are gendered versions.  
            (the-once-and-future-king.png)
            
        3.  Use the Hero version of the badge name, even if the badge is earned as a Villain.  
            (grounded.png, NOT pilot.png)
            
        4.  Append with -h and -v if there are different images for the Hero and Villain versions.  
            (tested-the-water-h.png and tested-the-water-v.png)
            
        5.  Remove special characters (the-doctors-ally.png)
            
        6.  Note: Images that are used by multiple badges may have a more generic name. Review existing badges and follow naming conventions as best as possible if you need to add a new image that’s used by multiple new badges. For example, there were four exploration badge imagess: hazard.png, hero.png, villain.png, and praetorian.png. Adding the Labyrinth of Fog exploration badge, one might use labyrinth.png.
            
7.  Upload the new badge image files to your working Branch on GitHub.  
    docs/images/badges/(appropriate category directory, e.g. accolade, exploration, etc.)
    
### Updating Category Files
ATC can provide sequential order. _Only needed if adding a new badge. Skip this section if you’re merely updating an existing badge._

1.  Open the file that starts with an underscore that is in the appropriate category directory. For example: if you’re adding a new Accolade, open the src/badge/accolade/\_accolade-badges.ts file. This step is necessary to get the badge to appear on the Badger site.
    
2.  Add an import command for the new badge to the bottom of the first list. This list uses “Export Name” and “Key Name” in the same line. “Export Name” is the Hero Male variant, CamelCase (ProperCase), no spaces or special characters.  
    Example: _**import {HistoryInTheMaking} from "./history-in-the-making";**_
    
3.  Insert the Export Name into the second list in this file, in the same spot the badge appears in-game. Open the appropriate badge category in the in-game list (NOT “Most Recent” – go to the actual category) and see what other badges the new badge falls between. Add the export name for the new badge in the appropriate place in the list.
    
### Adding New Badge .ts File

_Only add new .ts file if adding a whole new badge. If updating existing badge, find the appropriate .ts file and edit the required fields. For new badges, you can create a new .ts file from scratch, but it’s strongly recommended that you copy one from the most-similar badge instead._

Each code snippet below is an example of what you should include or modify in badge .ts files (each on separate lines). A full example file without notes is included at the end. The individual sections below use different badges as examples so don’t expect consistency until the mock .ts file at the end.

```
import {ALIGNMENT_ANY, Alternate, BadgePartialType, BadgeType, IBadgeData} from "coh-content-db";
```
All badge files start with this line. Change the **ALIGNMENT\_ANY** tag as appropriate. Possible values: ALIGNMENT\_HERO, ALIGNMENT\_VILLAIN, ALIGNMENT\_ANY – use whichever is required to **OBTAIN** the badge.

One accolade uses ALIGNMENT\_PRAETORIAN: https://n15g.github.io/badger/homecoming/badge/praetorias-son

One badge uses ALIGNMENT\_PRIMAL: https://n15g.github.io/badger/homecoming/badge/vip

Hopefully these are rare exceptions that never happen again.

**Alternate** is only required for badges that have alternate names or descriptions based on gender or alignment.

**BadgePartialType** is only included for badges that have other badges or prerequisites as requirements (Accolades, History)  

List all flags in alphabetical order.

```
import {ReclusesVictory} from "../../map/recluses-victory";
```
All zone-related badges include one or more map import lines. Accolades awarded for all exploration badges in a zone should import that zone map. History badges should import maps for every zone that has an associated history plaque. Exploration badges should import the map they’re found on. List all maps in alphabetical order. In theory, this allows users to click on links to open VidiotMaps of each zone. This isn’t actually implemented yet but we’re keeping up with it anyway.

```
import {AstoriasLastStand} from "../exploration/astorias-last-stand";
```
Next, add lines to import each of the badges that are required in order to earn the badge you’re working on (if any). List all badges in alphabetical order.

```
***Leave an empty line between the above imports section and the below export section.***
```
```
export const ProtectorOfInnocents: IBadgeData = {
```
Use the Export Name for the one for the new badge you’re adding. Reminder, Export Name is Hero Male variant in CamelCase (ProperCase), no spaces or special characters.

```
type: BadgeType.ACHIEVEMENT,
```
Use the appropriate badge category here. (ACCOLADE, ACCOMPLISHMENT, ACHIEVEMENT, AE, CONSIGNMENT, DAY\_JOB, DEFEAT, EVENT, EXPLORATION, GLADIATOR, HISTORY, INVENTION, OUROBOROS, PVP, VETERAN)

```
key: "protector-of-innocents",
```
Enter the Key Name here. Hero Male variant, lower case, no special characters, replace space with dash (snake-case or kebab-case).

```
SetTitleId: 21,
SetTitleIdPraetorian: 1669,
```
Run the SetTitle file and see where the new badge shows up in the list. Reference the badges before and after to get the Set Title ID for each. Reminder, get this from the release candidate on beta or from live. SetTitleID will almost certainly change between closed beta and release. Note that some badges have a second ID for the Praetorian version. (Hopefully rare for any new badges.)

```
names: [
{type: Alternate.H, value: "Sensation"},
{type: Alternate.MV, value: "Mr. Big"},
{type: Alternate.FV, value: "Ms. Big"},
{type: Alternate.P, value: "Acclaimed"}
],
```
(or)
```
names: [
{value: "A Light in Dark Astoria"}
],
```
Add the name of the badge, including any alternate forms.

```
alignment: ALIGNMENT_ANY,
```
Use the appropriate Alignment value. As mentioned previously, possible values include: ALIGNMENT\_HERO, ALIGNMENT\_VILLAIN, and ALIGNMENT\_ANY – use whichever is required to OBTAIN the badge. The two badges that use ALIGNMENT\_PRIMAL and ALIGNMENT\_PRAETORIAN are outliers and hopefully such cases won’t pop up again. Alignments in general are a little messy. We are empowered to make changes based on reasonable player feedback.

```
mapKey: NightWard.key,
```
Include the related map for Exploration badges.

```
location: [-411.0, 48.0, -2623.0],
```
Include the location coordinates for Exploration badges.

```
badgeText: [
{type: Alternate.H, value: "Positron has awarded you this badge for achieving Security Level 10."},
{type: Alternate.V, value: "Arachnos has awarded you the Soldier Badge for reaching Level 10."},
{
type: Alternate.P, value: "Working your way through the ins-and-outs of Praetoria's political landscape has become second " +
"nature to you."
}
],
```
(or)
```
badgeText: [
{type: Alternate.H, value: `Positron has awarded you this badge for achieving Security Level 10.`},
{type: Alternate.V, value: `Arachnos has awarded you the Soldier Badge for reaching Level 10.`},
{type: Alternate.P, value: `Working your way through the ins-and-outs of Praetoria's political landscape has become second nature to you.`}
],
```
Note the above has two types of quotes. Quotation marks are used for shorter lines, but longer lines are required to be broken into multiple lines. OR you can use back-ticks instead of quotation marks and not have to break longer lines up. **So it’s always better to use back-ticks instead of quotation marks.** Feel free to fix any quotes that still use quotation marks to use back-ticks instead. (This is the key to the left of the number 1 on US keyboard layouts, shared with Tilde.)

```
acquisition: "Reach level 10",
```
Short text that explains how to get the badge. Be concise and avoid spoilers.

```
notes: `This includes anything craftable on Invention Worktables, Base Worktables, and Empowerment Stations (including Empowerment Buffs), as well as special crafting such as the Vanguard Crafting Table and Candy Keeper.`,
```
Include additional notes and spoilers here.

```
links: [
{title: "Protector of Innocents Badge", href: "https://homecoming.wiki/wiki/Protector_of_Innocents_Badge"},
{title: "Soldier Badge", href: "https://homecoming.wiki/wiki/Soldier_Badge"},
{title: "Praetorian Professional Badge", href: "https://homecoming.wiki/wiki/Praetorian_Professional_Badge"}
],
```
Add links to the badge’s wiki page, including alternate titles. If there are alternates, list the hero male variant first. 

Be careful of special character code in the URL itself. For instance, the badge Dead Man's Tree has a URL that reads https&#65279;:/homecoming.wiki/wiki/Dead_Man%27s_Tree_Badge.  Note that the apostrophe is replaced with %27. Another example is Land, Sea & Air which has a comma and an ampersand, and its URL looks like https&#65279;://homecoming.wiki/wiki/Land%2C_Sea_%26_Air_Badge  with %2C for the comma and %26 for the ampersand. Reference [online sources](https://www.freecodecamp.org/news/url-encoded-characters-reference/) for other special characters.

```
icons: [
{type: Alternate.H, value: "https://n15g.github.io/coh-content-db-homecoming/images/badges/achievement/protector-of-innocents-h.png"},
{type: Alternate.V, value: "https://n15g.github.io/coh-content-db-homecoming/images/badges/achievement/protector-of-innocents-v.png"}
],
```
Link to the badge image file(s) located in the docs folder. Yes, it’s the same file, even though the above URLs don’t contain “docs” in the link. GitHub Magic (TM)!

```
partials: [
{key: AstoriasLastStand.key, type: BadgePartialType.BADGE, badgeKey: AstoriasLastStand.key},
{key: CairnWarder.key, type: BadgePartialType.BADGE, badgeKey: CairnWarder.key},
{key: DarkMystic.key, type: BadgePartialType.BADGE, badgeKey: DarkMystic.key},
{key: PhantomRadio.key, type: BadgePartialType.BADGE, badgeKey: PhantomRadio.key},

{
key: "bicn-0",
type: BadgePartialType.PLAQUE,
mapKey: AtlasPark.key,
plaqueType: PlaqueType.MONUMENT,
location: [330.45, 3.93, 397.33],
inscription: `On February 3, 1931, Rudolph Augustus Seifert arrived at Central Station near City Park - now Atlas Park. A Swiss foreigner, the architect found himself in Paragon City by chance, and by some miracle our city had found one of its most gifted artists in turn. Rudolph loved Paragon dearly and dedicated his life's work to uplifting the city in its darkest days.

Rudolph collaborated with architectural firm Ashburn and Cross to build a new vision of Paragon under the Paragon City Architectural Commision. This partnership was most notably responsible for such incredible sights as Independence Port's Valor Bridge and, most famously, the iconic statue of Atlas dominating the Atlas Park skyline ever since its completion and inauguration in April 1946. This plaque lies outside Hotel Geneva, Seifert's very first project within the city and the beginning of a quiet but deeply impactful legacy. Rudolph Augustus Seifert passed away in 1981, aged 83, survived only by the city he loved so very dearly.`,
notes: `This plaque is in [map:${AtlasPark.key}], roughly 258 yards south-southwest of the Atlas Plaza neighborhood marker.`,
vidiotMapKey: "8"
},
]
```
Accolades: list all badges required to earn this accolade in the Partials section in alphabetical order.

History Badges: List all required plaques, including Map Key, Plaque Type (WALL\_PLAQUE or MONUMENT), location, inscription, notes, and VidiotMaps key if there is one.

```
};
```
Close bracket for the whole page.

### Merging Updates

Once you’re certain you’ve correctly captured all updates, go to the main page of your edited branch. There will be a box at the top of the page that says “This branch is X commits ahead of the master.” This will include a link you can click that takes you to a summary page, comparing your changes to the master version. Take this opportunity to thoroughly review your changes for correctness and completeness. Near the top of that page is a green button titled “Create Pull Request.” Click that, then you’ll have an opportunity to add notes describing your changes. Then click the green Submit button, and a merge request will be sent to Nick/KeyboardKitsune.

Below is an example .ts file for a badge called Fake Badge, which includes code for several different badge types. Use only whichever portions and variables are required for the badge your're creating or updating. 

```
import {ALIGNMENT_ANY, Alternate, BadgePartialType, BadgeType, IBadgeData} from "coh-content-db";
import {ZoneName} from "../../map/zone-name";
import {ZoneNameTwo} from "../../map/zone-name-two";
import {RequiredBadge} from "../exploration/required-badge";
import {SecondRequiredBadge} from "../exploration/second-required-badge";

export const FakeBadge: IBadgeData = {
type: BadgeType.ACHIEVEMENT,
key: "fake-badge",
setTitleId: 9999,
names: [
{value: "Fake Badge With No Alternate Names"},
{type: Alternate.H, value: "Fake Badge Good Boy"},
{type: Alternate.F, value: "Fake Badge Good Girl"},
{type: Alternate.V, value: "Fake Badge Bad Any"},
{type: Alternate.MV, value: "Fake Badge Bad Boy"},
{type: Alternate.FV, value: "Fake Badge Bad Girl"},
{type: Alternate.P, value: "Fake Badge Gold Any"},
{type: Alternate.MP, value: "Fake Badge Gold Boy"},
{type: Alternate.FP, value: "Fake Badge Gold Girl"}
],
alignment: ALIGNMENT_ANY,
badgeText: [
{value: `This version is for when the Badge Fairy doesn’t care what your alignment is.`},
{type: Alternate.H, value: `The Badge Fairy awarded you this badge because you are wholesome.`},
{type: Alternate.V, value: `You stole this badge from the Badge Fairy because you are evil!`},
{type: Alternate.P, value: `You dragged the Badge Fairy through a portal and demanded this badge.`}
],
acquisition: `Do the Hokey Pokey with a full team of people in [map:${ZoneName.key}] or [map:zone-name]`,
notes: `The Hokey Pokey can be performed in an alternate reality where this emote exists. Spoiler text goes here. Remember to use back-ticks instead of quotation marks.`
links: [
{title: "Fake Badge Badge", href: "https://homecoming.wiki/wiki/There_Is_No_Real_URL_For_This"},
{title: "Alternate Name Badge", href: "https://homecoming.wiki/wiki/Remember_Special_Characters"}
],
icons: [
{value: "https://n15g.github.io/coh-content-db-homecoming/images/badges/achievement/fake-badge.png"}
],
partials: [
{key: RequiredBadge.key, type: BadgePartialType.BADGE, badgeKey: RequiredBadge.key},
{key: SecondRequiredBadge.key, type: BadgePartialType.BADGE, badgeKey: SecondRequiredBadge.key}
{
key: "fake-0",
type: BadgePartialType.PLAQUE,
mapKey: ZoneName.key,
plaqueType: PlaqueType.MONUMENT,
location: [330.45, 3.93, 397.33],
inscription: `The Badge Fairy first appears on this spot in 2005`,
notes: `This plaque is in [map:${ZoneName.key}] or [map:zone-name], 50 yards north of the Boopfield neighborhood marker.`,
vidiotMapKey: "8"
},
]
};
```

### To Obtain & View Badges In-Game

Create one Primal character with a Male costume in one slot and a Female costume in another slot. Create one Praetorian character who also has one Male and one Female costume. You’ll be able to swap costumes to see if the badge name or text changes by gender. Swap the Primal character’s alignment at Null the Gull to see if there are variants by alignment. **Take screen shots of everything.**

Award all badges on the Beta server:

1.  Save the badge-grant-all.txt file (in the docs directory) to your settings\beta folder in your Homecoming installation directory. You may have to create the beta folder. This file will need to be updated when new badges are added.    
2.  While logged into a character on the beta server, type /bindloadfile badge-grant-all.txt and hit enter.    
3.  Wait a few minutes while all the badges finish granting themselves to you.
    
Grant yourself new badges not yet included in the badge grant file:

1.  To determine the internal name of new badges: Open your sandbox directory in Piglet.
2.  Click on the bin folder on the left side, then select the badges.bin file.
3.  Export this file to your Repository folder and then open it with a text editor.
4.  Look up the badge texture filenames from the piggs (located in texture_library/gui/icons/badges) for all new badges
5.  Search badges.bin for each texture filename (just the filename, ignore the .texture extension) Example: The texture filename for the labyrinth history badge Greek Philosopher is badge\_i28\_history\_labyrinth. Search for this filename in badges.bin and you’ll find text as below: **LabyrinthHistory P2392203697 P344445814 P3379288051 badge\_i28\_history\_labyrinth**
6. Starting at the texture filename, look to the left, ignoring the long numbers preceded by a P (which are called P-strings), to the first text string that is not a P-string. In this case, that text string is **LabyrinthHistory**, which is the internal name of the new history badge. In game, use **/badgegrant LabyrinthHistory** to grant yourself this badge.    
7.  Repeat for any new badges not yet included in the badge granting file.

Now you can swap alignments and genders to check badge name and text.

Run the SetTitle file to log all badges:

1.  (Optional, see #5) Ensure logging is enabled under Windows – Chat Log – Enabled. If you had to enable this setting, log your character out and back in before continuing.    
2.  Save the [SetTitle file](https://n15g.github.io/badger/assets/settitle.txt) to your Homecoming directory.
3.  In game, type /bindloadfile "C:\<CoHDirectory>\settitle.txt". Replace <CoHDirectory> with the name of your City of Heroes install directory. Hit enter.
4.  Look at the output in the Global tab. Feel free to copy and paste this into a text document for your reference. Badges are output in sequential order according to SetTitleID.  
Example, this is part of the output for my character:
> \[14:33\] Zeta Reticulan has been selected as new title.  
> \[14:33\] Your badge title has been cleared  
> \[14:33\] Your badge title has been cleared  
> \[14:33\] Hidden In The Fog has been selected as new title.

Zeta Reticulan is an existing badge so I can look up its SetTitle ID: 2527. This is followed by two empty badges (2528 & 2529) before the Hidden in the Fog badge is awarded. This means Hidden in the Fog’s SetTitle ID is 2530.

5. The SetTitle file will produce more output than will fit in the chat window. This isn’t a problem with adding new badges as they’re always at the bottom, but you can check your log files for the full output if needed.
