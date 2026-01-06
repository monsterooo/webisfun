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
        <button onClick={handleRoot}>根元素</button>
        <button onClick={handleParent}>父元素</button>
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
  padding: 4px 6px;
  font-size: 12px;
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
