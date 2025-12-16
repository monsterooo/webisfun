const pageScrollCodeHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Scroll Page Example</title>
    <link rel="stylesheet" href="/style.css" />
    <style>
      html {
        scroll-timeline: --page-scroll block;
      }

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
        animation-timeline: --page-scroll;
      }
    </style>
  </head>
  <body>
    <div id="progress"></div>
    <header>
      <h1>The Future of Artificial Intelligence in Everyday Life</h1>
      <div class="article-meta">
        <div class="author">
          <div class="author-avatar">JS</div>
          <span>By John Smith</span>
        </div>
        <span>•</span>
        <time datetime="2024-12-11">December 11, 2024</time>
        <span>•</span>
        <span>8 min read</span>
      </div>
    </header>

    <main>
      <div class="featured-image">Featured Image Placeholder</div>

      <p class="lead">
        Artificial Intelligence is no longer a distant dream confined to science
        fiction novels. It has seamlessly integrated into our daily routines,
        transforming the way we work, communicate, and even think about the
        future.
      </p>

      <p>
        From the moment we wake up to personalized alarm tones that adapt to our
        sleep patterns, to the smart home devices that brew our morning coffee,
        AI has become an invisible yet indispensable companion in our lives. The
        technology that once seemed revolutionary is now so commonplace that we
        often take it for granted.
      </p>

      <p>
        The integration of AI into everyday life represents one of the most
        significant technological shifts in human history. Unlike previous
        industrial revolutions, this transformation is happening at an
        unprecedented pace, affecting virtually every aspect of our society
        simultaneously.
      </p>

      <h2>The AI Revolution in Our Homes</h2>

      <p>
        Smart home technology has evolved dramatically over the past decade.
        What started with simple voice-activated assistants has expanded into
        comprehensive ecosystems that learn and adapt to our preferences. These
        systems now anticipate our needs, adjusting lighting, temperature, and
        even suggesting recipes based on the ingredients in our refrigerators.
      </p>

      <blockquote>
        "The best technology is the one you don't notice. AI should enhance our
        lives without demanding our constant attention." - Dr. Sarah Chen, AI
        Research Director at MIT
      </blockquote>

      <p>
        Modern AI systems can now
        <span class="highlight">predict and prevent potential issues</span>
        before they occur. For instance, smart thermostats learn your schedule
        and preferences, optimizing energy consumption while maintaining
        comfort. Security systems use facial recognition and behavioral analysis
        to distinguish between residents, visitors, and potential threats.
      </p>

      <h2>Transforming Professional Environments</h2>

      <p>
        The workplace has undergone a remarkable transformation thanks to AI
        integration. Tasks that once consumed hours of human labor are now
        completed in seconds, freeing professionals to focus on creative and
        strategic thinking. Here are some key areas where AI is making a
        significant impact:
      </p>

      <ul>
        <li>
          <strong>Automated Data Analysis:</strong> AI systems can process vast
          amounts of data, identifying patterns and insights that would take
          humans months to discover.
        </li>
        <li>
          <strong>Enhanced Communication:</strong> Real-time translation
          services break down language barriers, enabling global collaboration
          like never before.
        </li>
        <li>
          <strong>Personalized Learning:</strong> AI-powered educational
          platforms adapt to individual learning styles, making professional
          development more effective.
        </li>
        <li>
          <strong>Predictive Maintenance:</strong> Industrial AI systems monitor
          equipment health, preventing costly breakdowns before they occur.
        </li>
      </ul>

      <h3>Healthcare Revolution</h3>

      <p>
        Perhaps nowhere is the impact of AI more profound than in healthcare.
        Medical AI systems can now analyze medical images with accuracy that
        rivals—and sometimes surpasses—human experts. Early detection of
        diseases such as cancer has improved dramatically, saving countless
        lives.
      </p>

      <p>
        Personalized medicine, powered by AI analysis of genetic data, allows
        doctors to tailor treatments to individual patients. This approach has
        proven particularly effective in treating complex conditions where
        one-size-fits-all solutions have historically fallen short.
      </p>

      <h2>The Ethical Considerations</h2>

      <p>
        However, this rapid advancement doesn't come without challenges. As AI
        systems become more sophisticated, we must grapple with important
        ethical questions:
      </p>

      <ol>
        <li>
          How do we ensure AI systems respect privacy while still providing
          personalized services?
        </li>
        <li>
          What safeguards are necessary to prevent algorithmic bias from
          perpetuating societal inequalities?
        </li>
        <li>
          How can we maintain human agency in a world increasingly mediated by
          AI decisions?
        </li>
        <li>
          What role should regulation play in governing AI development and
          deployment?
        </li>
      </ol>

      <p>
        These questions don't have easy answers, but they're crucial to address
        as we continue to integrate AI more deeply into our lives. The goal
        should not be to replace human judgment but to augment it, creating
        systems that enhance our capabilities while preserving our autonomy and
        values.
      </p>

      <h2>Looking Ahead</h2>

      <p>
        The future of AI in everyday life promises even more profound changes.
        Emerging technologies like quantum computing could exponentially
        increase AI capabilities, enabling solutions to problems we currently
        consider unsolvable. From climate modeling to drug discovery, the
        potential applications are virtually limitless.
      </p>

      <p>
        Yet, as we stand on the brink of these advances, we must remain mindful
        of the human element. Technology should serve humanity, not the other
        way around. The most successful AI implementations will be those that
        feel natural, intuitive, and genuinely helpful rather than intrusive or
        overwhelming.
      </p>

      <blockquote>
        "The question isn't whether AI will change our future—it's already doing
        that. The question is whether we'll guide that change toward outcomes
        that benefit all of humanity." - Professor Michael Rodriguez, Ethics in
        Technology Institute
      </blockquote>

      <h2>Conclusion</h2>

      <p>
        As artificial intelligence continues to evolve and permeate every aspect
        of our daily lives, we find ourselves at a critical juncture. The
        technology we develop today will shape the world our children inherit
        tomorrow. By approaching AI development with thoughtfulness, ethical
        consideration, and a commitment to human values, we can ensure that this
        powerful technology enhances rather than diminishes our humanity.
      </p>

      <p>
        The future of AI in everyday life is not predetermined—it's being
        written right now, through the choices we make and the priorities we
        set. By staying informed, engaged, and thoughtful about these
        developments, we can help guide AI toward a future that benefits
        everyone.
      </p>
    </main>

    <footer>
      <p>
        <strong>About the Author:</strong> John Smith is a technology journalist
        and AI researcher with over 15 years of experience covering emerging
        technologies and their impact on society.
      </p>

      <div class="tags">
        <span class="tag">Artificial Intelligence</span>
        <span class="tag">Technology</span>
        <span class="tag">Future</span>
        <span class="tag">Innovation</span>
        <span class="tag">Smart Home</span>
      </div>
    </footer>
  </body>
</html>
`;

const pageScrollCodeStyle = `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "Georgia", serif;
  line-height: 1.8;
  color: #333;
  background-color: #f5f5f5;
}
/* Header */
header {
  padding: 60px 20px;
  text-align: center;
}
header h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
  font-weight: 700;
  line-height: 1.2;
}
.article-meta {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  font-size: 0.95em;
  opacity: 0.95;
}
.author {
  display: flex;
  align-items: center;
  gap: 10px;
}
.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

/* Main Content */
main {
  max-width: 800px;
  margin: 40px auto;
  background-color: white;
  padding: 60px;
  border-radius: 6px;
}
.featured-image {
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin-bottom: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2em;
  opacity: 0.8;
}
h2 {
  font-size: 1.8em;
  margin: 40px 0 20px 0;
  color: #2c3e50;
  font-weight: 600;
}
h3 {
  font-size: 1.4em;
  margin: 30px 0 15px 0;
  color: #34495e;
  font-weight: 600;
}
p {
  margin-bottom: 20px;
  text-align: justify;
  font-size: 1.1em;
}
.lead {
  font-size: 1.3em;
  font-weight: 400;
  color: #555;
  margin-bottom: 30px;
  line-height: 1.6;
  font-style: italic;
}
blockquote {
  border-left: 4px solid #667eea;
  padding-left: 20px;
  margin: 30px 0;
  font-style: italic;
  color: #555;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 4px;
}
.highlight {
  background-color: #fff3cd;
  padding: 2px 6px;
  border-radius: 3px;
}
ul,
ol {
  margin: 20px 0 20px 40px;
}
li {
  margin-bottom: 10px;
  font-size: 1.1em;
}
/* Footer */
footer {
  max-width: 800px;
  margin: 0 auto 40px auto;
  padding: 30px 60px;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #666;
}
.tags {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;
}
.tag {
  background-color: #e9ecef;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.9em;
  color: #495057;
}
/* Responsive */
@media (max-width: 768px) {
  header h1 {
    font-size: 1.8em;
  }
  main {
    padding: 30px 20px;
    margin: 20px;
  }
  footer {
    padding: 20px;
    margin: 0 20px 20px 20px;
  }
  .featured-image {
    height: 250px;
  }
  h2 {
    font-size: 1.5em;
  }
  h3 {
    font-size: 1.2em;
  }
  p,
  li {
    font-size: 1em;
  }
  .lead {
    font-size: 1.1em;
  }
}`;

export const pageScrollCode = {
  "/index.html": pageScrollCodeHtml,
  "/style.css": pageScrollCodeStyle,
};
