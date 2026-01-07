const pageScrollCodeHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Scroll Page Example</title>
    <link rel="stylesheet" href="/style.css" />
    <style>
      @keyframes grow-progress {
        from {
          transform: scaleX(0);
        }
        to {
          transform: scaleX(1);
        }
      }

      .progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 8px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }

      .progress {
        transform-origin: 0 50%;
        animation: grow-progress auto linear;
        animation-timeline: scroll();
      }
    </style>
  </head>
  <body>
    <div class="progress"></div>
    <div>
      <h3>The standard Lorem Ipsum passage, used since the 1500s</h3>
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt
      mollit anim id est laborum."
      <h3>
        Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero
        in 45 BC
      </h3>
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
      accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
      illo inventore veritatis et quasi architecto beatae vitae dicta sunt
      explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
      odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
      voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
      quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
      eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
      voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam
      corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
      Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
      quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
      voluptas nulla pariatur?"
      <h3>1914 translation by H. Rackham</h3>
      "But I must explain to you how all this mistaken idea of denouncing
      pleasure and praising pain was born and I will give you a complete
      account of the system, and expound the actual teachings of the great
      explorer of the truth, the master-builder of human happiness. No one
      rejects, dislikes, or avoids pleasure itself, because it is pleasure,
      but because those who do not know how to pursue pleasure rationally
      encounter consequences that are extremely painful. Nor again is there
      anyone who loves or pursues or desires to obtain pain of itself, because
      it is pain, but because occasionally circumstances occur in which toil
      and pain can procure him some great pleasure. To take a trivial example,
      which of us ever undertakes laborious physical exercise, except to
      obtain some advantage from it? But who has any right to find fault with
      a man who chooses to enjoy a pleasure that has no annoying consequences,
      or one who avoids a pain that produces no resultant pleasure?"
      <h3>
        Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero
        in 45 BC
      </h3>
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui
      blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
      et quas molestias excepturi sint occaecati cupiditate non provident,
      similique sunt in culpa qui officia deserunt mollitia animi, id est
      laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
      distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
      cumque nihil impedit quo minus id quod maxime placeat facere possimus,
      omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem
      quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet
      ut et voluptates repudiandae sint et molestiae non recusandae. Itaque
      earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
      voluptatibus maiores alias consequatur aut perferendis doloribus
      asperiores repellat."
      <h3>1914 translation by H. Rackham</h3>
      "On the other hand, we denounce with righteous indignation and dislike
      men who are so beguiled and demoralized by the charms of pleasure of the
      moment, so blinded by desire, that they cannot foresee the pain and
      trouble that are bound to ensue; and equal blame belongs to those who
      fail in their duty through weakness of will, which is the same as saying
      through shrinking from toil and pain. These cases are perfectly simple
      and easy to distinguish. In a free hour, when our power of choice is
      untrammelled and when nothing prevents our being able to do what we like
      best, every pleasure is to be welcomed and every pain avoided. But in
      certain circumstances and owing to the claims of duty or the obligations
      of business it will frequently occur that pleasures have to be
      repudiated and annoyances accepted. The wise man therefore always holds
      in these matters to this principle of selection: he rejects pleasures to
      secure other greater pleasures, or else he endures pains to avoid worse
      pains."
    </div>
  </body>
</html>
`;

const pageScrollCodeStyle = `body {
  font-family: "Microsoft YaHei", Arial, sans-serif;
  line-height: 1.6;
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  color: #333;
}
h1, h2 {
  color: #2c3e50;
  text-align: center;
}
img {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 20px auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
p {
  text-align: justify;
  margin-bottom: 20px;
}`;

export const pageScrollCode = {
  "/index.html": pageScrollCodeHtml,
  "/style.css": pageScrollCodeStyle,
};

const scrollRootAndParentCodeAppJs = `import { useState } from 'react';
import './App.css';

function App() {
  const [scrollType, setScrollType] = useState('parent');

  const handleRoot = () => {
    setScrollType('root');
  };

  const handleParent = () => {
    setScrollType('parent');
  };

  return (
    <div>
      <div className="box">
        <div className={\`progress $\{scrollType}\`}></div>
        <h3>The standard Lorem Ipsum passage, used since the 1500s</h3>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum."
        <h3>
          Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero
          in 45 BC
        </h3>
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
        illo inventore veritatis et quasi architecto beatae vitae dicta sunt
        explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
        odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
        quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
        eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
        voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam
        corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
        Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
        quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
        voluptas nulla pariatur?"
        <h3>1914 translation by H. Rackham</h3>
        "But I must explain to you how all this mistaken idea of denouncing
        pleasure and praising pain was born and I will give you a complete
        account of the system, and expound the actual teachings of the great
        explorer of the truth, the master-builder of human happiness. No one
        rejects, dislikes, or avoids pleasure itself, because it is pleasure,
        but because those who do not know how to pursue pleasure rationally
        encounter consequences that are extremely painful. Nor again is there
        anyone who loves or pursues or desires to obtain pain of itself, because
        it is pain, but because occasionally circumstances occur in which toil
        and pain can procure him some great pleasure. To take a trivial example,
        which of us ever undertakes laborious physical exercise, except to
        obtain some advantage from it? But who has any right to find fault with
        a man who chooses to enjoy a pleasure that has no annoying consequences,
        or one who avoids a pain that produces no resultant pleasure?"
        <h3>
          Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero
          in 45 BC
        </h3>
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui
        blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
        et quas molestias excepturi sint occaecati cupiditate non provident,
        similique sunt in culpa qui officia deserunt mollitia animi, id est
        laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
        distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
        cumque nihil impedit quo minus id quod maxime placeat facere possimus,
        omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem
        quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet
        ut et voluptates repudiandae sint et molestiae non recusandae. Itaque
        earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
        voluptatibus maiores alias consequatur aut perferendis doloribus
        asperiores repellat."
        <h3>1914 translation by H. Rackham</h3>
        "On the other hand, we denounce with righteous indignation and dislike
        men who are so beguiled and demoralized by the charms of pleasure of the
        moment, so blinded by desire, that they cannot foresee the pain and
        trouble that are bound to ensue; and equal blame belongs to those who
        fail in their duty through weakness of will, which is the same as saying
        through shrinking from toil and pain. These cases are perfectly simple
        and easy to distinguish. In a free hour, when our power of choice is
        untrammelled and when nothing prevents our being able to do what we like
        best, every pleasure is to be welcomed and every pain avoided. But in
        certain circumstances and owing to the claims of duty or the obligations
        of business it will frequently occur that pleasures have to be
        repudiated and annoyances accepted. The wise man therefore always holds
        in these matters to this principle of selection: he rejects pleasures to
        secure other greater pleasures, or else he endures pains to avoid worse
        pains."
      </div>
      <div style={{ height: 800 }} />
      <p>结束文本</p>
      <div style={{ height: 100 }} />

      <div className="toolbar">
        <button onClick={handleRoot}>根元素滚动</button>
        <button onClick={handleParent}>父元素滚动</button>
      </div>
    </div>
  );
}

export default App;
`;

const scrollRootAndParentCodeAppCss = `#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

html {
  scroll-timeline: --page-scroll block;
}

.box {
  height: 300px;
  overflow: scroll;
}

.progress {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.progress {
  transform-origin: 0 50%;
  animation: grow-progress auto linear;
  animation-timeline: scroll();
}

.root {
  position: fixed;
  animation-timeline: --page-scroll;
}

@keyframes grow-progress {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.toolbar {
  position: fixed;
  left: 50%;
  bottom: 30px;
  transform: translateX(-50%);
  border-radius: 4px;
  background: #667eea40;
  padding: 6px;
  color: white;
  display: flex;
  gap: 6px;
}

.toolbar button {
  background: oklch(0.59 0.08 227);
  border: none;
  color: white;
  padding: 12px 18px;
  font-size: 14px;
  border-radius: 4px;
}
`;

export const scrollRootAndParentCode = {
  "/App.js": scrollRootAndParentCodeAppJs,
  "/App.css": scrollRootAndParentCodeAppCss,
};

const scrollViewCode1Html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>View Example1</title>
    <link rel="stylesheet" href="/style.css" />
    <style>
      img {
        animation: shapeIn linear forwards;
        animation-timeline: view(30% 0);
      }
      @keyframes shapeIn {
        from {
          clip-path: rect(0px 0% 100% 0px round 10%);
        }
        to {
          clip-path: rect(0px 100% 100% 0px round 10%);
        }
      }
    </style>
  </head>
  <body>
    <div>
      <h2>Salmon</h2>
      <p>Salmon (/ˈsæmən/; pl.: salmon) are any of several commercially important species of euryhaline ray-finned fish from the genera Salmo and Oncorhynchus of the family Salmonidae, native to tributaries of the North Atlantic (Salmo) and North Pacific (Oncorhynchus) basins. Salmon is a colloquial or common name used for fish in this group, but is not a scientific name. Other closely related fish in the same family include trout, char, grayling, whitefish, lenok and taimen, all coldwater fish of the subarctic and cooler temperate regions with some sporadic endorheic populations in Central Asia.</p>
      <p>Salmon are typically anadromous: they hatch in the shallow gravel beds of freshwater headstreams and spend their juvenile years in rivers, lakes and freshwater wetlands, migrate to the ocean as adults and live like sea fish, then return to their freshwater birthplace to reproduce. However, populations of several species are restricted to fresh waters (i.e. landlocked) throughout their lives. Folklore has it that the fish return to the exact stream where they themselves hatched to spawn, and tracking studies have shown this to be mostly true. A portion of a returning salmon run may stray and spawn in different freshwater systems; the percent of straying depends on the species of salmon.[1] Homing behavior has been shown to depend on olfactory memory.</p>
      <p>Salmon are important food fish and are intensively farmed in many parts of the world,[4] with Norway being the world's largest producer of farmed salmon, followed by Chile.[5] They are also highly prized game fish for recreational fishing, by both freshwater and saltwater anglers. Many species of salmon have since been introduced and naturalized into non-native environments such as the Great Lakes of North America, Patagonia in South America and South Island of New Zealand</p>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Salmo_salar.jpg/1599px-Salmo_salar.jpg" />
      <h2>Name and etymology</h2>
      <p>The Modern English term salmon is derived from Middle English: samoun, samon and saumon, which in turn are from Anglo-Norman: saumon, from Old French: saumon, and from Latin: salmō (which in turn might have originated from salire, meaning "to leap".[7]). The unpronounced "l" absent from Middle English was later added as a Latinisation to make the word closer to its Latin root. The term salmon has mostly displaced its now dialectal synonym lax, in turn from Middle English: lax, from Old English: leax, from Proto-Germanic: *lahsaz from Proto-Indo-European: *lakso-.</p>
      <h2>Species</h2>
      <p>The seven commercially important species of salmon occur in two genera of the subfamily Salmoninae. The genus Salmo contains the Atlantic salmon, found in both sides of the North Atlantic, as well as more than 40 other species commonly named as trout. The genus Oncorhynchus contains 12 recognised species which occur naturally only in the North Pacific, six of which are known as Pacific salmon while the remainder are considered trout. Outside their native habitats, Chinook salmon have been successfully introduced in New Zealand and Patagonia, while coho, sockeye and Atlantic salmon have been established in Patagonia, as well.</p>
      <h2>Salmo (Atlantic salmon)</h2>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Salmo_salar.png/248px-Salmo_salar.png" />
      <h2>Oncorhynchus (Pacific salmon)</h2>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Humpback_Salmon_Adult_Male.jpg/250px-Humpback_Salmon_Adult_Male.jpg" />
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Humpback_Salmon_Breeding_Male.jpg/250px-Humpback_Salmon_Breeding_Male.jpg" />
      <p>The extinct Eosalmo driftwoodensis, the oldest known Salmoninae fish in the fossil record, helps scientists figure how the different species of salmon diverged from a common ancestor. The Eocene salmon's fossil from British Columbia provides evidence that the divergence between Pacific and Atlantic salmon had not yet occurred 40 million years ago. Both the fossil record and analysis of mitochondrial DNA suggest the divergence occurred 10 to 20 million years ago during the Miocene. This independent evidence from DNA analysis and the fossil record indicate that salmon divergence occurred long before the Quaternary glaciation began the cycle of glacial advance and retreat.</p>
      <h2>Non-salmon species of "salmon"</h2>
      <p>There are several other species of fish which are colloquially called "salmon" but are not true salmon. Of those listed below, the Danube salmon or huchen is a large freshwater salmonid closely related (from the same subfamily) to the seven species of salmon above, but others are fishes of unrelated orders, given the common name "salmon" simply due to similar shapes, behaviors and niches occupied</p>
    </div>
  </body>
</html>`;
const scrollViewCode1Style = `body {
  font-family: "Microsoft YaHei", Arial, sans-serif;
  line-height: 1.6;
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  color: #333;
}
h1, h2 {
  color: #2c3e50;
  text-align: center;
}
img {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 20px auto;
  border-radius: 8px;
}
p {
  text-align: justify;
  margin-bottom: 20px;
}`;

export const scrollViewCode1 = {
  "/index.html": scrollViewCode1Html,
  "/style.css": scrollViewCode1Style,
};

const scrollViewCode2Html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>View Example1</title>
    <link rel="stylesheet" href="/style.css" />
    <style>
      img {
        animation: shapeIn linear forwards;
        animation-timeline: view(30% 10%);
      }
      @keyframes shapeIn {
        from {
          clip-path: rect(0px 0% 100% 0px round 0%);
        }
        to {
          clip-path: rect(0px 100% 100% 0px round 0%);
        }
      }
    </style>
  </head>
  <body>
    <div>
      <h2>Salmon</h2>
      <p>Salmon (/ˈsæmən/; pl.: salmon) are any of several commercially important species of euryhaline ray-finned fish from the genera Salmo and Oncorhynchus of the family Salmonidae, native to tributaries of the North Atlantic (Salmo) and North Pacific (Oncorhynchus) basins. Salmon is a colloquial or common name used for fish in this group, but is not a scientific name. Other closely related fish in the same family include trout, char, grayling, whitefish, lenok and taimen, all coldwater fish of the subarctic and cooler temperate regions with some sporadic endorheic populations in Central Asia.</p>
      <p>Salmon are typically anadromous: they hatch in the shallow gravel beds of freshwater headstreams and spend their juvenile years in rivers, lakes and freshwater wetlands, migrate to the ocean as adults and live like sea fish, then return to their freshwater birthplace to reproduce. However, populations of several species are restricted to fresh waters (i.e. landlocked) throughout their lives. Folklore has it that the fish return to the exact stream where they themselves hatched to spawn, and tracking studies have shown this to be mostly true. A portion of a returning salmon run may stray and spawn in different freshwater systems; the percent of straying depends on the species of salmon.[1] Homing behavior has been shown to depend on olfactory memory.</p>
      <p>Salmon are important food fish and are intensively farmed in many parts of the world,[4] with Norway being the world's largest producer of farmed salmon, followed by Chile.[5] They are also highly prized game fish for recreational fishing, by both freshwater and saltwater anglers. Many species of salmon have since been introduced and naturalized into non-native environments such as the Great Lakes of North America, Patagonia in South America and South Island of New Zealand</p>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Salmo_salar.jpg/1599px-Salmo_salar.jpg" />
      <h2>Name and etymology</h2>
      <p>The Modern English term salmon is derived from Middle English: samoun, samon and saumon, which in turn are from Anglo-Norman: saumon, from Old French: saumon, and from Latin: salmō (which in turn might have originated from salire, meaning "to leap".[7]). The unpronounced "l" absent from Middle English was later added as a Latinisation to make the word closer to its Latin root. The term salmon has mostly displaced its now dialectal synonym lax, in turn from Middle English: lax, from Old English: leax, from Proto-Germanic: *lahsaz from Proto-Indo-European: *lakso-.</p>
      <h2>Species</h2>
      <p>The seven commercially important species of salmon occur in two genera of the subfamily Salmoninae. The genus Salmo contains the Atlantic salmon, found in both sides of the North Atlantic, as well as more than 40 other species commonly named as trout. The genus Oncorhynchus contains 12 recognised species which occur naturally only in the North Pacific, six of which are known as Pacific salmon while the remainder are considered trout. Outside their native habitats, Chinook salmon have been successfully introduced in New Zealand and Patagonia, while coho, sockeye and Atlantic salmon have been established in Patagonia, as well.</p>
      <h2>Salmo (Atlantic salmon)</h2>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Salmo_salar.png/248px-Salmo_salar.png" />
      <h2>Oncorhynchus (Pacific salmon)</h2>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Humpback_Salmon_Adult_Male.jpg/250px-Humpback_Salmon_Adult_Male.jpg" />
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Humpback_Salmon_Breeding_Male.jpg/250px-Humpback_Salmon_Breeding_Male.jpg" />
      <p>The extinct Eosalmo driftwoodensis, the oldest known Salmoninae fish in the fossil record, helps scientists figure how the different species of salmon diverged from a common ancestor. The Eocene salmon's fossil from British Columbia provides evidence that the divergence between Pacific and Atlantic salmon had not yet occurred 40 million years ago. Both the fossil record and analysis of mitochondrial DNA suggest the divergence occurred 10 to 20 million years ago during the Miocene. This independent evidence from DNA analysis and the fossil record indicate that salmon divergence occurred long before the Quaternary glaciation began the cycle of glacial advance and retreat.</p>
      <h2>Non-salmon species of "salmon"</h2>
      <p>There are several other species of fish which are colloquially called "salmon" but are not true salmon. Of those listed below, the Danube salmon or huchen is a large freshwater salmonid closely related (from the same subfamily) to the seven species of salmon above, but others are fishes of unrelated orders, given the common name "salmon" simply due to similar shapes, behaviors and niches occupied</p>
      <div class="overlay start">inset start 30%</div>
      <div class="overlay end">inset end 10%</div>
    </div>
  </body>
</html>`;
const scrollViewCode2Style = `body {
  font-family: "Microsoft YaHei", Arial, sans-serif;
  line-height: 1.6;
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  color: #333;
}
h1, h2 {
  color: #2c3e50;
  text-align: center;
}
img {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 20px auto;
  border-radius: 0;
  border: 1px solid red;
}
p {
  text-align: justify;
  margin-bottom: 20px;
}
.overlay {
  position: fixed;
  left: 0;
  right: 0;
  background-color: #f5deb3aa;
  display: flex;
  color: red;
  justify-content: center;
}
.start {
  top: 0;
  height: 30%;
  align-items: end;
}
.end {
  bottom: 0;
  height: 10%;
  align-items: start;
}
`;

export const scrollViewCode2 = {
  "/index.html": scrollViewCode2Html,
  "/style.css": scrollViewCode2Style,
};

const scrollToolViewTimeLineHtml = `<!DOCTYPE html>
<html lang="en" data-loading>

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>View Progress Timeline: Ranges and Animation Progress Visualizer</title>
	<link rel="stylesheet" href="/shared/styles.css">
	<script type="module">
		const sync = true;

		// Get params from URL
		const urlParams = new URLSearchParams(window.location.hash.replace('#',''));

		// Set values based on params, falling back to an initial value.
		let animation_range_start_name = urlParams.get('range-start-name') ?? 'cover';
		let animation_range_start_percentage = urlParams.get('range-start-percentage') ?? 0;
		let animation_range_end_name = urlParams.get('range-end-name') ?? 'cover';
		let animation_range_end_percentage = urlParams.get('range-end-percentage') ?? 100;
		let view_timeline_axis = 'block';
		let view_timeline_inset = urlParams.get('view-timeline-inset') ?? 0;
		let subject_size = urlParams.get('subject-size') ?? 'smaller';
		let progress = 0;
		let subject_animation = urlParams.get('subject-animation') ?? 'reveal';
		let interactivity = 'clicktodrag';
		let show_areas = ((urlParams.get('show-areas') ?? 'yes') === 'yes') ? true : false;
		let show_fromto = ((urlParams.get('show-fromto') ?? 'yes') === 'yes') ? true : false;
		let show_labels = ((urlParams.get('show-labels') ?? 'yes') === 'yes') ? true : false;

		const $animationLine = document.getElementById('animation-line');
		const $subject = document.getElementById('subject');
		const $subjectInner = document.getElementById('subject-inner');
		const $progress = document.getElementById('progress');
		const $scrollport = document.getElementById('scrollport');
		const $scrollbar = document.querySelector('#scrollbar');
		const $thumb = document.querySelector('#scrollbar #thumb');
		const $from = document.getElementById('from');
		const $to = document.getElementById('to');
		const $fromLabel = $from.querySelector('span');
		const $toLabel = $to.querySelector('span');
		const $pageContent = document.querySelector('.page-content');

		const $boxEndEdgeOutside = document.querySelector('.box[data-zone="end-edge-outside"]');
		const $boxEndEdgeInside = document.querySelector('.box[data-zone="end-edge-inside"]');
		const $boxStartEdgeOutside = document.querySelector('.box[data-zone="start-edge-outside"]');
		const $boxStartEdgeInside = document.querySelector('.box[data-zone="start-edge-inside"]');

		const render = () => {
			// Calculate positions for all ranges
			const rangePositions = {
				cover: {
					start: $boxEndEdgeOutside.getBoundingClientRect().y,
					end: $boxStartEdgeOutside.getBoundingClientRect().y,
				},
				contain: {
					start: subject_size == 'smaller' ? $boxEndEdgeInside.getBoundingClientRect().y : $boxStartEdgeInside.getBoundingClientRect().y,
					end: subject_size == 'smaller' ? $boxStartEdgeInside.getBoundingClientRect().y : $boxEndEdgeInside.getBoundingClientRect().y,
				},
				'entry-crossing': {
					start: $boxEndEdgeOutside.getBoundingClientRect().y,
					end: $boxEndEdgeInside.getBoundingClientRect().y,
				},
				'exit-crossing': {
					start: $boxStartEdgeInside.getBoundingClientRect().y,
					end: $boxStartEdgeOutside.getBoundingClientRect().y,
				},
				entry: {
					start: $boxEndEdgeOutside.getBoundingClientRect().y,
					end: subject_size == 'smaller' ? $boxEndEdgeInside.getBoundingClientRect().y : $boxStartEdgeInside.getBoundingClientRect().y,
				},
				exit: {
					start: subject_size == 'smaller' ? $boxStartEdgeInside.getBoundingClientRect().y : $boxEndEdgeInside.getBoundingClientRect().y,
					end: $boxStartEdgeOutside.getBoundingClientRect().y,
				}
			};

			// Position #from
			const startRangePosition = rangePositions[animation_range_start_name];
			$from.style.top = \`$\{document.documentElement.scrollTop + startRangePosition.start + ((startRangePosition.end - startRangePosition.start) * animation_range_start_percentage) / 100}px\`;

			// Position #to
			const endRangePosition = rangePositions[animation_range_end_name];
			$to.style.top = \`$\{document.documentElement.scrollTop + endRangePosition.start + ((endRangePosition.end - endRangePosition.start) * animation_range_end_percentage) / 100}px\`;

			// Position #animation-line
			$animationLine.style.top = \`$\{$to.style.top}\`;
			$animationLine.style.height = \`$\{parseInt($from.style.top) + parseInt(getComputedStyle($from).height) - parseInt($to.style.top)}px\`;

			// Sync some values
			document.documentElement.setAttribute('subject-size', subject_size);
			document.documentElement.setAttribute('subject-animation', subject_animation);
			document.documentElement.setAttribute('show-areas', show_areas ? 'yes' : 'no');
			document.documentElement.setAttribute('show-fromto', show_fromto ? 'yes' : 'no');
			document.documentElement.setAttribute('show-labels', show_labels ? 'yes' : 'no');
			document.documentElement.setAttribute('interactivity', interactivity);

			// Labels
			$fromLabel.innerText = \`$\{animation_range_start_name} $\{animation_range_start_percentage}%\`;
			$toLabel.innerText = \`$\{animation_range_end_name} $\{animation_range_end_percentage}%\`;

			// URL

			const output = [];
			output.push('#subject {');
			output.push(\`  animation: $\{subject_animation} linear both;\`);
			output.push(\`  animation-timeline: view($\{view_timeline_axis});\`);
			output.push(\`  animation-range: $\{animation_range_start_name} $\{animation_range_start_percentage}% $\{animation_range_end_name} $\{animation_range_end_percentage}%;\`);
			if (view_timeline_inset != 0) output.push(\`  view-timeline-inset: $\{view_timeline_inset}%;\`);
			output.push(\`}\`);
			document.getElementById('output').textContent = output.join('\\n');
			document.getElementById('output').setAttribute('data-lines', output.length);

			document.getElementById('range').innerText = \`animation-range: $\{animation_range_start_name} $\{animation_range_start_percentage}% $\{animation_range_end_name} $\{animation_range_end_percentage}%;\`;
		}

		const waitForTransitionAndRender = () => {
			$scrollport.addEventListener('transitionend', function() {
				setTimeout(render, 0);
			}, { once: true});
		}

		document.getElementById('animation-range-start-name').addEventListener('change', function (e) {
			animation_range_start_name = this.options[this.selectedIndex].value;
			if (document.getElementById('animation-range-end-name').selectedIndex == 0) animation_range_end_name = animation_range_start_name;
			render();
		});
		document.getElementById('animation-range-start-percentage').addEventListener('change', function (e) {
			animation_range_start_percentage = this.valueAsNumber;
			render();
		});
		document.getElementById('animation-range-end-name').addEventListener('change', function (e) {
			if (this.selectedIndex == 0) {
				animation_range_end_name = animation_range_start_name;
			} else {
				animation_range_end_name = this.options[this.selectedIndex].value;
			}
			render();
		});
		document.getElementById('animation-range-end-percentage').addEventListener('change', function (e) {
			animation_range_end_percentage = this.valueAsNumber;
			render();
		});
		document.getElementById('view-timeline-axis').addEventListener('change', function (e) {
			view_timeline_axis = this.options[this.selectedIndex].value;
			render();
		});
		document.getElementById('view-timeline-inset').addEventListener('change', function (e) {
			view_timeline_inset = this.valueAsNumber;
			document.documentElement.style.setProperty('--view-timeline-inset', view_timeline_inset); // CSS will take this into account
			waitForTransitionAndRender();
		});
		document.getElementById('subject-size-taller').addEventListener('change', function (e) {
			if (!this.checked) return;
			subject_size = this.value;
			document.documentElement.setAttribute('subject-size', subject_size); // CSS will take this into account
			waitForTransitionAndRender();
		});
		document.getElementById('subject-size-smaller').addEventListener('change', function (e) {
			if (!this.checked) return;
			subject_size = this.value;
			document.documentElement.setAttribute('subject-size', subject_size); // CSS will take this into account
			waitForTransitionAndRender();
		});
		// document.getElementById('interactivity-autoplay').addEventListener('change', function (e) {
		// 	if (!this.checked) return;
		// 	interactivity = this.value;
		// 	render();
		// });
		// document.getElementById('interactivity-clicktodrag').addEventListener('change', function (e) {
		// 	if (!this.checked) return;
		// 	interactivity = this.value;
		// 	render();
		// });
		document.getElementById('show-fromto').addEventListener('change', function (e) {
			show_fromto = this.checked;
			render();
		});
		document.getElementById('show-areas').addEventListener('change', function (e) {
			show_areas = this.checked;
			render();
		});
		document.getElementById('show-labels').addEventListener('change', function (e) {
			show_labels = this.checked;
			render();
		});
		document.getElementById('subject-animation').addEventListener('change', function (e) {
			subject_animation = this.options[this.selectedIndex].value;
			document.documentElement.style.setProperty('--subject-animation', \`subject-animation--$\{subject_animation}\`); // CSS will take this into account
			setTimeout(function() {
				$subjectInner.getAnimations()[0].currentTime = Math.min((progress * 10).toFixed(5), 1000);
			}, 0);
			render();
		});
		document.getElementById('reset').addEventListener('click', function (e) {
			if (!confirm('Are you sure?')) return;

			resetValues();
			syncValuesToDOM();
			setTimeout(() => {
				document.documentElement.removeAttribute('data-loading');
				render();
			}, 250); // @TODO: Find some nicer way to do this …
		});

		const resetValues = () => {
			animation_range_start_name = 'cover';
			animation_range_start_percentage = 0;
			animation_range_end_name = 'cover';
			animation_range_end_percentage = 100;
			view_timeline_axis = 'block';
			view_timeline_inset = 0;
			subject_size = 'smaller';
			progress = 0;
			subject_animation = 'reveal';
			interactivity = 'clicktodrag';
			show_areas = true;
			show_fromto = true;
			show_labels = true;
		}

		const syncValuesToDOM = () => {
			// Sync up controls to reflect the actual values
			document.querySelector('#animation-range-start-name').value = animation_range_start_name;
			document.querySelector('#animation-range-start-percentage').value = animation_range_start_percentage;
			document.querySelector('#animation-range-end-name').value = animation_range_end_name;
			document.querySelector('#animation-range-end-percentage').value = animation_range_end_percentage;
			document.querySelector('#view-timeline-axis').value = view_timeline_axis;
			document.querySelector('#view-timeline-inset').value = view_timeline_inset;
			document.querySelector('#subject-animation').value = subject_animation;
			document.querySelector('#subject-size-taller').checked = subject_size === 'taller';
			document.querySelector('#subject-size-smaller').checked = subject_size === 'smaller';
			document.querySelector('#interactivity-autoplay').checked = interactivity === 'autoplay';
			document.querySelector('#interactivity-clicktodrag').checked = interactivity === 'clicktodrag';
			document.querySelector('#show-fromto').checked = show_fromto;
			document.querySelector('#show-areas').checked = show_areas;
			document.querySelector('#show-labels').checked = show_labels;

			// Sync up DOM to reflect actual values
			document.documentElement.setAttribute('subject-size', subject_size);
			document.documentElement.setAttribute('subject-animation', subject_animation);
			document.documentElement.setAttribute('show-areas', show_areas ? 'yes' : 'no');
			document.documentElement.setAttribute('show-fromto', show_fromto ? 'yes' : 'no');
			document.documentElement.setAttribute('show-labels', show_labels ? 'yes' : 'no');
			document.documentElement.setAttribute('interactivity', interactivity);
			document.documentElement.style.setProperty('--view-timeline-inset', view_timeline_inset);
			document.documentElement.style.setProperty('--subject-animation', \`subject-animation--$\{subject_animation}\`);
		}

		window.addEventListener('resize', (e) => { setTimeout(render, 500); }); // @TODO: Make this nicer or fix the CSS transition
		window.addEventListener('orientationchange', (e) => { setTimeout(render, 500); }); // @TODO: Make this nicer or fix the CSS transition

		const updateProgress = (e) => {
			const animatedBoundingRect = $subject.getBoundingClientRect();
			const animationLineBoundingRect = $animationLine.getBoundingClientRect();

			let newProgress = 0;

			if ((animatedBoundingRect.y >= animationLineBoundingRect.y) && (animatedBoundingRect.y <= (animationLineBoundingRect.y + animationLineBoundingRect.height - animatedBoundingRect.height))) {
				$subject.classList.add('intersecting');
				newProgress = (1 - (animatedBoundingRect.y - animationLineBoundingRect.y) / (animationLineBoundingRect.height - animatedBoundingRect.height)) * 100;
			} else {
				if ((animatedBoundingRect.y >= animationLineBoundingRect.y)) {
					newProgress = 0;
				} else if((animatedBoundingRect.y <= (animationLineBoundingRect.y + animationLineBoundingRect.height - animatedBoundingRect.height))) {
					newProgress = 100;
				}
				$subject.classList.remove('intersecting');
			}
			if (newProgress !== progress) {
				$progress.innerText = \`$\{newProgress.toFixed(5)}%\`;
				progress = newProgress;
				$subjectInner.getAnimations()[0].currentTime = Math.min((newProgress * 10).toFixed(5), 1000);
			}
			requestAnimationFrame(updateProgress);
		};
		requestAnimationFrame(updateProgress); // @TODO: Use an IntersectionObserver for this.

		// Make scrollbar usable
		$thumb.addEventListener('pointerdown', (e) => {
			if (interactivity != 'clicktodrag') return;

			const duration = 10000;
			const scrollbarBox = $scrollbar.getBoundingClientRect();
			const thumbBox = $thumb.getBoundingClientRect();
			const minY = scrollbarBox.top;
			const maxY = scrollbarBox.top + scrollbarBox.height - thumbBox.height;
			const offsetInThumb = e.offsetY;

			const onMove = (e) => {
				const dragProgress = (e.clientY - offsetInThumb - minY) / (maxY - minY);
				$thumb.getAnimations()[0].currentTime = Math.max(0, Math.min(dragProgress, 1)) * duration;
				$pageContent.getAnimations()[0].currentTime = Math.max(0, Math.min(dragProgress, 1)) * duration;
			}

			const removeEventListener = () => {
				document.removeEventListener('pointermove', onMove);
			}
			document.addEventListener('pointermove', onMove);
			document.addEventListener('pointerup', removeEventListener);
		});

		syncValuesToDOM();
		setTimeout(() => {
			document.documentElement.removeAttribute('data-loading');
			render();
		}, 250); // @TODO: Find some nicer way to do this …

		document.documentElement.addEventListener('pointerdown', (e) => {
			document.documentElement.classList.add('interacted');
		}, { once: true });

		const $toggleControls = document.querySelector('#toggle-controls');
		$toggleControls.addEventListener('click', (e) => {
			const value = $toggleControls.getAttribute('aria-expanded');
			$toggleControls.setAttribute('aria-expanded', value === 'true' ? 'false' : 'true');
		});

		if (!document.documentElement.classList.contains('is-embed')) $toggleControls.setAttribute('aria-expanded', true);

		document.getElementById('range').addEventListener('click', (e) => {
			window.alert('Use the controls at the top right to change these values');
		})
	</script>
	<style>
		:root {
			--scrollbox-border-size: 1em;
			--scrollbox-height: 40vmin;
			--scrollbox-width: calc(var(--scrollbox-height) * 16 / 9);

			--box-height: 10vmin;
			--box-border-size: 0.25rem;

			--thumb-size: 15vmin;
			--scrollbar-width: 0.75rem;

			--shaded-size: 2px;
			--shaded-color: rgba(0 0 0 / 0.12);

			--animation-line-width: 4px;
			--animation-line-color: limegreen;

			--view-timeline-inset: 0;
			--visual-inset: calc(var(--scrollbox-height) * var(--view-timeline-inset) / 100);

			--content-height: calc(var(--scrollbox-height) * 3.25);
			--subject-animation: subject-animation--reveal;
		}

		:root[subject-size="taller"] {
			--box-height: calc(var(--scrollbox-height) * 1.1);
			--content-height: calc(var(--scrollbox-height) * 4.5);
		}

		#browser *,
		#browser *::after,
		#browser *::before,
		#animation-line,
		#from,
		#to {
			transition: all 0.25s ease-in-out;
		}

		html {
			background: white;
			color: black;
		}

		html,
		body {
			width: 100%;
			height: 100%;
			margin: 0;
			padding: 0;
			overflow: hidden;
		}

		body {
			display: grid;
			place-content: safe center;
		}

		#browser {
			width: var(--scrollbox-width);
			height: var(--scrollbox-height);
			border: max(1em, var(--scrollbox-border-size)) solid lightblue; /* This border is just to reserve some space*/
			border-radius: 0.5em;

			display: grid;
			grid-template-columns: 1fr var(--scrollbar-width);
			grid-template-rows: 1fr;
			grid-template-areas: "content scrollbar";

			position: relative;
			z-index: 1;

			position: fixed;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}

		/* Inject the border on top of the browser, so that the content slides underneath */
		#browser::before {
			content: "";
			top: calc(var(--scrollbox-border-size) * -1);
			left: calc(var(--scrollbox-border-size) * -1);
			width: var(--scrollbox-width);
			height: var(--scrollbox-height);
			border: max(1em, var(--scrollbox-border-size)) solid lightblue;
			border-left-color: transparent;
			border-right-color: transparent;

			position: absolute;
			z-index: 2;
			pointer-events: none;
			box-shadow: 0px 0px 1em 0px rgb(0 0 0 / 0.5);
			border-radius: 0.5em;
		}

		#browser * {
			margin: 0;
			padding: 0;
			-webkit-user-select: none;
			user-select: none;
		}

		main {
			position: relative;
			background: transparent;
			z-index: 3;
			width: calc(var(--scrollbox-width) - var(--scrollbar-width));
			box-shadow: inset 0px 0px 1em 0px rgb(0 0 0 / 0.5);
			pointer-events: none;
		}

		main::before,
		main::after {
			white-space: nowrap;
			display: inline-block;
			position: absolute;
			left: -1rem;
			text-transform: uppercase;
			font-size: 0.8rem;
		}

		main::before {
			content: 'start edge + inset';
			top: 0;
			transform: translate3d(calc((1em + var(--scrollbox-border-size) + 100%) * -1), calc(0% - (var(--scrollbox-border-size) / 2) + var(--visual-inset)), 0);
		}

		main::after {
			content: 'end edge + inset';
			bottom: 0;
			transform: translate3d(calc((1em + var(--scrollbox-border-size) + 100%) * -1), calc(0% + (var(--scrollbox-border-size) / 2) - var(--visual-inset)), 0);
		}

		#scrollbar {
			grid-area: scrollbar;
			height: 100%;
			align-self: start;

			background: #ccc;
			padding: 0 1px;
		}

		#scrollbar #thumb {
			margin-top: 0;
			height: var(--thumb-size);
			width: 100%;
			background: #555;
			border-radius: 9999px;
		}

		#scrollbar #thumb::after {
			content: 'Drag Me ➡';
			color: red;
			position: absolute;
			right: calc(100% + 0.5rem);
			top: 2rem;
			display: block;
			white-space: nowrap;
			font-size: 2em;
			font-style: italic;
			transform: rotate(-2.5deg);
			transform-origin: 50% 50%;
		}

		.interacted #scrollbar #thumb::after {
			opacity: 0;
		}

		.box {
			height: var(--box-height);
			position: absolute;
			left: 0;
			right: 0;
			z-index: 1;
		}

		:root[data-loading] :is(.box, #subject) {
			opacity: 0 !important;
		}

		.box::after {
			text-transform: uppercase;
			font-size: 0.8rem;
			display: inline-block;
			position: absolute;
			left: -1rem;
			top: 50%;
			display: inline-block;
			content: attr(data-zone);
			transform: translate3d(calc((1em + var(--scrollbox-border-size) + 100%) * -1), calc(0% - (var(--scrollbox-border-size) / 2)), 0);
		}

		.box[data-zone] {
			background: repeating-linear-gradient(-45deg,
					var(--shaded-color),
					var(--shaded-color) var(--shaded-size),
					transparent var(--shaded-size),
					transparent calc(var(--shaded-size) * 5));
			opacity: 0.5;
			pointer-events: all;
		}

		.box[data-zone]:hover {
			opacity: 1;
		}

		:root[show-areas="no"] .box[data-zone] {
			opacity: 0;
		}

		:is(:root[show-labels="no"], :root.is-embed) main::before,
		:is(:root[show-labels="no"], :root.is-embed) main::after,
		:is(:root[show-labels="no"], :root.is-embed) .box[data-zone]::after {
			opacity: 0;
		}

		.box[data-zone]::after {
			content: attr(data-title-small);
			display: block;
		}

		.box[data-zone="end-edge-outside"] {
			transform: translateY(calc(var(--scrollbox-height) - var(--visual-inset)));
			border-top: var(--box-border-size) dashed #333;
		}

		.box[data-zone="end-edge-inside"] {
			transform: translateY(calc(var(--scrollbox-height) - var(--box-height) - var(--box-border-size) - var(--visual-inset)));
			border-bottom: var(--box-border-size) dashed #333;
		}

		.box[data-zone="start-edge-inside"] {
			transform: translateY(var(--visual-inset));
			border-top: var(--box-border-size) dashed #333;
		}

		.box[data-zone="start-edge-outside"] {
			transform: translateY(calc(-1 * (var(--box-height) + var(--box-border-size) - var(--visual-inset))));
			border-bottom: var(--box-border-size) dashed #333;
		}

		#base-line,
		#animation-line {
			width: 0;
			height: auto;

			border: 0.5em solid transparent;
			position: absolute;
			left: calc(50% - (var(--scrollbar-width) / 2));
			top: 50%;
			bottom: 50%;
			opacity: 0.8;
		}

		#animation-line {
			z-index: 0;
			left: calc(50% - ((var(--scrollbar-width) + var(--animation-line-width)) / 2));

			border-top: 0;
			border-bottom: 0;
			top: 50vh;
			height: 0;
			width: var(--animation-line-width);
			background: var(--animation-line-color);
			background-clip: content-box;
			opacity: 0;
		}

		#base-line {
			top: 0;
			bottom: 0;
			border-color: #ccc;
			min-height: calc(var(--scrollbox-height) + (var(--box-height) * 1.1 * 2) + (var(--scrollbox-border-size) * 2));
			display: none;
		}


		#from,
		#to,
		#subject {
			--shaded-color: #333;
			width: calc(var(--scrollbox-width) / 1.5);
			left: calc(50% - var(--scrollbox-width) / 3);

			height: calc(var(--box-height) + var(--box-border-size));

			background: repeating-linear-gradient(45deg,
					var(--shaded-color),
					var(--shaded-color) var(--shaded-size),
					transparent var(--shaded-size),
					transparent calc(var(--shaded-size) * 10));
			/* 	border-top: var(--box-border-size) solid lime; */

			position: absolute;

			outline: 2px dashed var(--shaded-color);

			display: grid;
			justify-content: start;
			align-items: start;
			font-size: 1.2em;
			-webkit-user-select: none;
			user-select: none;
		}
		#subject {
			justify-content: end;
		}

		#from,
		#to {
			opacity: 0.6;
		}

		:is(#from, #to, #subject) span {
			background-color: #FFF;
			padding: 0.25em;
		}

		:root[show-fromto="no"] :is(#from, #to) {
			opacity: 0;
		}

		#controls {
			position: fixed;
			right: 0;
			top: 0;
			background-color: #fff;
			padding: 1em;
			border-left: 0.5em solid #ccc;
			border-bottom: 0.5em solid #ccc;
			border-bottom-left-radius: 0.5em;
			z-index: 100;
		}

		body > h1 { /* sr-only */
			position: absolute;
			width: 1px;
			height: 1px;
			padding: 0;
			margin: -1px;
			overflow: hidden;
			clip: rect(0, 0, 0, 0);
			white-space: nowrap;
			border-width: 0;
		}

		@keyframes slide {
			to {
				translate: 0 calc((100% - var(--scrollbox-height)) * -1);
			}
		}

		:is(.page-content, #scrollbar #thumb) {
			animation: slide 10s linear 0s infinite alternate forwards;
			pointer-events: all;
			transition: none;
		}

		html[interactivity="clicktodrag"] :is(.page-content, #scrollbar #thumb) {
			animation-play-state: paused;
		}
		html[interactivity="clicktodrag"] #scrollbar #thumb {
			cursor: grab;
		}
		html[interactivity="clicktodrag"] #scrollbar #thumb:active,
		html[interactivity="clicktodrag"]:has(#scrollbar #thumb:active) {
			cursor: grabbing;
		}

		.page-content {
			height: var(--content-height);
			width: calc(var(--scrollbox-width) - var(--scrollbar-width));
			position: absolute;
			top: 0;
			left: 0;
			background-color: aliceblue;
			background-image: linear-gradient(to right, rgb(0 0 0 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(0 0 0 / 0.05) 1px, transparent 1px);
			background-size: 10vh 10vh;
			z-index: -1;
		}

		#subject {
			top: calc(var(--scrollbox-height) * 1.5);
			left: calc(50% - (var(--scrollbox-width) / 3) + (var(--scrollbar-width) / 2));
			outline-color: rgba(255, 0, 0, 1);
			background: transparent;
		}

		#subject.intersecting {
			outline-color: rgba(50, 205, 50, 1);
		}

		#toggle-controls {
			font-size: .8em;
			margin-left: 100%;
			transform: translateX(-100%);
		}
		#toggle-controls[aria-expanded="true"]::after {
			content: 'hide controls';
			white-space: nowrap;
		}
		#toggle-controls[aria-expanded="false"]::after {
			content: 'show controls';
			white-space: nowrap;
		}

		#controls:has(#toggle-controls[aria-expanded="false"]) > *:not(#toggle-controls) {
			display: none;
		}

		fieldset:has(> #reset) {
			border: 0;
			text-align: center;
			padding: 14px 0 0 0;
		}

		@keyframes subject-animation--none /* Faked */ {
			from {
				opacity: 0;
			}
			to {
				opacity: 0;
			}
		}
		@keyframes subject-animation--scale-up {
			from {
				transform-origin: 50% 50%;
				scale: 0;
			}
			to {
				transform-origin: 50% 50%;
				scale: 1;
			}
		}
		@keyframes subject-animation--scale-down {
			from {
				transform-origin: 50% 50%;
				scale: 1;
			}
			to {
				transform-origin: 50% 50%;
				scale: 0;
			}
		}
		@keyframes subject-animation--reveal {
			from {
				opacity: 0;
				clip-path: inset(0% 60% 0% 50%);
			}
			to {
				opacity: 1;
				clip-path: inset(0% 0% 0% 0%);
			}
		}
		@keyframes subject-animation--fly-in {
			from {
				opacity: 0;
				translate: -100% 0 0;
			}
			to {
				opacity: 1;
				translate: 0 0 0;
			}
		}
		@keyframes subject-animation--fly-out {
			from {
				opacity: 1;
				translate: 0 0 0;
			}
			to {
				opacity: 0;
				translate: 100% 0 0;
			}
		}

		#subject-inner {
			position: absolute;
			height: 100%;
			width: 100%;
			z-index: -1;
			outline: 1px solid #333;
			animation: var(--subject-animation) 1s linear paused forwards;
			background-color: grey;
		}

		#range {
			position: absolute;
			width: max-content;
			text-align: center;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.is-embed .hide-when-embedded {
			display: none !important;
		}
		.hide {
			display: none !important;
		}

		body > *:not(#controls, #metabox) {
			-webkit-touch-callout: none;
		}

		#output {
			box-sizing: border-box;
			width: 100%;
			resize: none;
			height: calc(84px + 20px);
			padding: 10px;
			overflow: auto;
			font-family: "Monaspace", monospace;
			font-palette: --kung-fury;
			font-size: 12px;
			white-space: pre;
		}
		#output[data-lines="5"] {
			height: calc(72px + 20px);
		}
	</style>
	<link rel="stylesheet" href="/shared/styles.css">
	<script src="/shared/scripts.js"></script>
</head>

<body>
	<!-- Controls -->
	<div id="controls">
		<button id="toggle-controls" aria-expanded="false"></button>
		<fieldset>
			<legend>animation-range</legend>
			<label for="animation-range-start-name">animation-range-start <em>(name + %)</em></label>
			<div>
				<select name="animation-range-start-name" id="animation-range-start-name">
					<option value="cover">cover</option>
					<option value="contain">contain</option>
					<option value="entry-crossing">entry-crossing</option>
					<option value="entry">entry</option>
					<option value="exit-crossing">exit-crossing</option>
					<option value="exit">exit</option>
				</select>
				<input type="number" min="0" max="100" step="5" value="0" name="animation-range-start-percentage" id="animation-range-start-percentage">
			</div>
			<label for="animation-range-end-name">animation-range-end <em>(name + %)</em></label>
			<div>
				<select name="animation-range-end-name" id="animation-range-end-name">
					<option value="mirrored">(mirrored)</option>
					<option value="cover">cover</option>
					<option value="contain">contain</option>
					<option value="entry-crossing">entry-crossing</option>
					<option value="entry">entry</option>
					<option value="exit-crossing">exit-crossing</option>
					<option value="exit">exit</option>
				</select>
				<input type="number" min="0" max="100" step="5" value="100" name="animation-range-end-percentage" id="animation-range-end-percentage">
			</div>
		</fieldset>

		<fieldset>
			<legend>view-timeline</legend>
			<label for="view-timeline-axis">axis</label>
			<select name="view-timeline-axis" id="view-timeline-axis" disabled>
				<option value="block">block</option>
				<option value="inline">inline</option>
			</select>
			<label for="view-timeline-inset">inset <em>(%)</em></label>
			<input type="number" min="0" max="30" step="5" value="0" name="view-timeline-inset" id="view-timeline-inset">
		</fieldset>

		<fieldset>
			<legend>subject</legend>
			<label for="subject-animation">Animation</label>
			<div>
				<select name="subject-animation" id="subject-animation">
					<option value="none">(none)</option>
					<option value="scale-up">scale-up</option>
					<option value="scale-down">scale-down</option>
					<option value="reveal" selected>reveal</option>
					<option value="fly-in">fly-in</option>
					<option value="fly-out">fly-out</option>
				</select>
			</div>
			<label>Size</label>
			<div>
				<label><input type="radio" name="subject-size" id="subject-size-smaller" value="smaller" checked> Smaller than scrollport</label><br>
				<label><input type="radio" name="subject-size" id="subject-size-taller" value="taller"> Taller than scrollport</label>
			</div>
		</fieldset>

		<fieldset class="hide hide-when-embedded">
			<legend>Interactivity</legend>
			<div>
				<label><input type="radio" name="interactivity" id="interactivity-autoplay" value="autoplay"> Autoplay</label><br>
				<label><input type="radio" name="interactivity" id="interactivity-clicktodrag" value="clicktodrag" checked> Use scrollbar</label>
			</div>
		</fieldset>

		<fieldset class="hide-when-embedded">
			<legend>Visualization</legend>
			<label><input type="checkbox" name="show-fromto" id="show-fromto" checked> Show From/To Boxes</label><br>
			<label><input type="checkbox" name="show-areas" id="show-areas" checked> Show Areas</label><br>
			<label><input type="checkbox" name="show-labels" id="show-labels" checked> Show Labels</label>
		</fieldset>

		<fieldset>
			<legend>Output</legend>
			<textarea name="output" id="output" readonly></textarea>
		</fieldset>

		<fieldset>
			<button id="reset">Reset all values</button>
		</fieldset>
	</div>

	<!-- Visualization -->
	<h1><small>Scroll-driven Animations</small><br>View Progress Timeline<br>Ranges and Animation Progress Visualizer</h1>
	<div id="browser">
		<main id="scrollport" data-animation-range-start-name="cover" data-animation-range-start-percentage="0" data-animation-range-end-name="cover" data-animation-range-end-percentage="0" data-view-timeline-axis="block" data-view-timeline-inset="0">
			<!-- The four main zones around the edges -->
			<div class="box" data-zone="end-edge-outside" data-title-small="entry-crossing 0% – entry 0% – cover 0%"  data-title-tall="entry-crossing 0% – entry 0% – cover 0%"></div>
			<div class="box" data-zone="end-edge-inside" data-title-small="entry-crossing 100% – entry 100% – contain 0%"  data-title-tall="entry-crossing 100% – exit 0% – contain 100%"></div>
			<div class="box" data-zone="start-edge-inside" data-title-small="exit-crossing 0% – exit 0% – contain 100%"  data-title-tall="exit-crossing 0% – entry 100% – contain 0%"></div>
			<div class="box" data-zone="start-edge-outside" data-title-small="exit-crossing 100% – exit 100% – cover 100%" data-title-tall="exit-crossing 100% – exit 100% – cover 100%"></div>
		</main>
		<div class="page-content">
			<div id="subject">
				<div id="subject-inner"></div>
				<span id="progress">0.0000%</span>
				<span id="range">animation-range: cover 0% cover 100%;</span>
			</div>
		</div>
		<aside id="scrollbar">
			<div id="thumb"></div>
		</aside>
	</div>

	<!-- To from and to positions -->
	<div class="box" id="from"><span>cover 0%</span></div>
	<div class="box" id="to"><span>cover 100%</span></div>

	<!-- Line indicating the length of the animation -->
	<div id="animation-line"></div>
	<div id="base-line"></div>
	</div>
<script defer src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015" integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ==" data-cf-beacon='{"version":"2024.11.0","token":"4f175b1ac3204b9ca216125bb4bd6018","r":1,"server_timing":{"name":{"cfCacheStatus":true,"cfEdge":true,"cfExtPri":true,"cfL4":true,"cfOrigin":true,"cfSpeedBrain":true},"location_startswith":null}}' crossorigin="anonymous"></script>
</body>

</html>
`;
const scrollToolViewTimeLineStyle = `@layer demo, meta;

@font-face {
  font-family: 'Monaspace';
  src: 
    url('/shared/MonaspaceKrypton-SyntaxHighlighter-Regular.woff2') 
    format('woff2')
  ;
}

@font-palette-values --kung-fury {
  font-family: "Monaspace";
  override-colors:
    0 hsl(225 100% 40%), /* curlies and tags */
    1 hsl(250 100% 80%), /* ? */
    2 hsl(225 100% 40%), /* function */
    3 hsl(225 100% 40%), /* ? */
    4 hsl(270 50% 40%),  /* () */
    5 hsl(210 40% 2%),   /* property name */ 
    6 hsl(210 10% 30%),  /* ? */
    7 hsl(327 100% 54%)  /* numbers */
  ;
}

@layer meta {
	@layer metabox {
		#metabox {
			position: fixed;
			bottom: 1rem;
			right: 1rem;

			display: flex;
			flex-direction: column;
			gap: 1rem;
			font-size: 1.2rem;
			z-index: 2147483647;
		}

		/* Hide all but infobox when embedded */
		.is-embed #metabox :is(#version-selector, #version-selector-popover, .button[href="/"]) {
			display: none;
		}

		#metabox :is(button, .button) {
			font-size: 2.5rem;
			line-height: 1;
			display: block;

			border: 0;
			background: transparent;
			padding: 0;
			cursor: pointer;

			opacity: 0.7;
			transition: opacity 0.25s ease-in-out;
			border-radius: 0.25rem;
			text-decoration: none;
		}

		#metabox :is(button, .button):active,
		#metabox :is(button, .button):focus {
			outline: 2px dashed rgb(0 0 0 / 0.5);
			outline-offset: 0.25rem;
		}

		#metabox > :is(button, .button):hover {
			opacity: 1 !important;
		}

		@keyframes pulsate {
			80% {
				opacity: 1;
			}
			85% {
				opacity: 1;
			}
			90% {
				opacity: 0;
			}
			95% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}

		#metabox > button.animated {
			animation: 5s pulsate ease-in alternate infinite;
		}

		#metabox > button.animated:hover,
		#metabox > button.animated:focus,
		#metabox:has(dialog[open]) > button.animated {
			animation: none;
		}

		#metabox > button[disabled] {
			cursor: not-allowed;
			outline: none !important;
		}
	}

	@layer infobox {
		@layer ui {
			#infobox[open] {
				box-sizing: border-box;
				margin: 10vh auto;
				width: 80vw;
				max-width: 90ch;
				max-height: 80vh;
				padding: 2rem;
				overscroll-behavior: contain;

				background: #eee;
				border: 0.25rem solid lightblue;
				overflow: auto;

				position: fixed;
			}

			#infobox::backdrop {
				background-color: rgb(0 0 0 / 0.5);
			}

			#infobox > :first-child {
				margin-top: 0;
			}
			#infobox > :last-child {
				margin-bottom: 0;
			}

			#infobox-close {
				position: absolute;
				right: 0.5rem;
				top: 0.5rem;

				filter: grayscale();
			}
			#infobox-close:hover,
			#infobox-close:focus {
				filter: none;
			}
		}

		@layer code {
			#infobox pre {
				border: 1px solid #dedede;
				padding: 1em;
				background: #f7f7f7;
				font-family: "Monaspace", monospace;
			  font-palette: --kung-fury;
				overflow-x: auto;
				border-left: 0.4em solid cornflowerblue;
				tab-size: 2;
			}

			#infobox code {
				font-family: "Monaspace", monospace;
			  font-palette: --kung-fury;
			}

			#infobox code:not(pre code),
			#infobox output:not(code:has(output) output) {
				background: #f7f7f7;
				border: 1px solid rgb(0 0 0 / 0.2);
				padding: 0.1rem 0.3rem;
				margin: 0.1rem 0;
				border-radius: 0.2rem;
				display: inline-block;
			}
		}
	}

	@layer popover {
		[popovertarget][data-activeversion] {
			position: relative;
		}
		[popovertarget][data-activeversion]::after {
			content: attr(data-activeversion);
			position: absolute;
			bottom: 0;
			right: 0;
			z-index: 2;
			font-size: 0.8rem;
			font-weight: bold;
			padding: 0.1em;
			background-color: #1874bc;
			color: white;
			font-family: 'Courier New', Courier, monospace;
			font-variant-numeric: tabular-nums;
			display: block;
			min-width: 2ex;
			line-height: 1;
		}
		[popovertarget][data-activeversion][data-activelang="js"]::after {
			background-color: #f7df1e;
			color: #333;
		}
		[popovertarget] {
			anchor-name: --my-anchor-popover;
		}
		[popover] {
			inset: auto;
			width: auto;
			padding: 1rem 1rem 2rem 1rem;
			overflow: unset;
			bottom: calc(anchor(top) - 3rem);
			right: calc(anchor(right) + 3rem);
		}

		.no-anchor [popover] {
			min-width: 20rem;
			/* transform: translate(calc(-100% - 1rem), calc(-100% + 1rem)); */
			z-index: 2147483647;
			bottom: 10rem;
			right: 4.5rem;
		}

		[popover] > :first-child {
			margin-top: 0;
		}
		[popover] > :last-child {
			margin-bottom: 0;
		}

		[popover] [data-lang]::before {
			content: attr(data-lang);
			font-size: 0.8rem;
			font-weight: bold;
			padding: 0.1em;
			background-color: blue;
			color: white;
			font-family: 'Courier New', Courier, monospace;
			font-variant-numeric: tabular-nums;
			background-color: #1874bc;
			display: inline-block;
			width: 2rem;
			text-align: center;
			vertical-align: middle;
			margin-right: 0.2rem;
		}
		[popover] [data-lang="js"]::before {
			background-color: #f7df1e;
			color: #333;
		}

		[popover] [data-selected] {
			font-weight: 700;
		}
	}

	@layer warning {
		.warning {
			box-sizing: border-box;
			padding: 1em;
			margin: 1em 0;
			border: 1px solid #ccc;
			background: rgba(255 255 205 / 0.8);
		}

		.warning > :first-child {
			margin-top: 0;
		}

		.warning > :last-child {
			margin-bottom: 0;
		}

		.warning a {
			color: blue;
		}
		.warning--info {
			border: 1px solid #123456;
			background: rgb(205 230 255 / 0.8);
		}
		.warning--alarm {
			border: 1px solid red;
			background: #ff000010;
		}

		@supports (animation-timeline: view()) {
			.warning:not([data-bug]) {
				display: none;
			}
		}

		@supports(animation-range: 0vh 90vh) {
			.warning[data-bug="1427062"] {
				display: none;
			}
		}
	}
}
`;

export const scrollToolViewTimeLine = {
  "/index.html": scrollToolViewTimeLineHtml,
  "/shared/styles.css": scrollToolViewTimeLineStyle,
};
