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

      #progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 8px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }

      #progress {
        transform-origin: 0 50%;
        animation: grow-progress auto linear;
        animation-timeline: scroll();
      }
    </style>
  </head>
  <body>
    <div id="progress"></div>

    <h1>爱因斯坦的相对论简介</h1>

    <img src="https://media.cnn.com/api/v1/images/stellar/prod/160316111528-01-einstein-tbt.jpg?q=w_2400,h_1350,x_0,y_0,c_fill" alt="阿尔伯特·爱因斯坦肖像">

    <p>阿尔伯特·爱因斯坦（Albert Einstein）是20世纪最伟大的物理学家之一。他于1905年提出了<strong>狭义相对论</strong>，并在1915年完成了<strong>广义相对论</strong>。相对论彻底改变了我们对空间、时间和引力的传统理解。</p>

    <h2>狭义相对论</h2>

    <p>狭义相对论适用于没有引力场的匀速运动情况。其两大基本原理是：</p>
    <ul>
        <li>物理定律在所有惯性参考系中都相同（相对性原理）。</li>
        <li>光速在真空中对所有观察者都是恒定的，无论光源或观察者的运动状态如何。</li>
    </ul>

    <img src="https://galileo.phys.virginia.edu/classes/252/srelwhat_files/image002.gif" alt="光钟思想实验：说明时间膨胀">

    <p>这些原理导致了一些反直觉的结论，如时间膨胀、长度收缩，以及最著名的质能等价公式：</p>

    <div class="equation">E = mc²</div>

    <img src="https://cdn.britannica.com/80/222280-138-41E211F6/Your-Daily-Equation-01-E-mc2.jpg" alt="E=mc² 方程">

    <p>其中，E是能量，m是质量，c是光速。这表明质量和能量是等价的，小量质量可以转化为巨大能量，这也是核能的基础。</p>

    <h2>广义相对论</h2>

    <p>广义相对论是将引力纳入相对论框架的理论。爱因斯坦提出，引力不是一种“力”，而是质量导致的时空弯曲。大量物体（如恒星或行星）会使周围的时空像橡胶膜一样弯曲，其他物体沿着弯曲的路径运动，我们感受到这就是引力。</p>

    <img src="https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2015/09/spacetime_curvature/15576376-2-eng-GB/Spacetime_curvature.jpg" alt="时空弯曲示意图：质量使时空弯曲">

    <p>广义相对论成功解释了水星轨道进动、引力红移、光线弯曲等现象，并预言了黑洞、引力波（2015年被直接探测到）和宇宙膨胀等。</p>

    <p>相对论不仅是理论物理的基石，还深刻影响了现代科技，如GPS系统必须考虑相对论效应才能精准定位。爱因斯坦的相对论提醒我们，宇宙远比牛顿经典力学描述的更奇妙和动态。</p>
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
}
.equation {
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
  margin: 30px 0;
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
