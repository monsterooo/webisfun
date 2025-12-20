const cssDirection1Html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/style.css" />
    <title>Css Direction</title>
    <style>
      /* css direction */
      @layer {
        .dir {
          position: absolute;
          transition: all 0.4s ease;

          &:before {
            content: '';
            position: absolute;
            width: 100%;
            height: 50%;
          }

          &:hover {
            bottom: 0;
            z-index: 1;
          }

          &:hover:before {
            width: 100%;
            height: 100%;
            transform: none;
          }
        }

        .bottom {
          background: pink;
          bottom: -100%;

          &:before {
            bottom: 100%;
            left: 0;
            transform-origin: 0 100%;
          }
        }

        .top {
          background: aqua;
          bottom: 100%;

          &:before {
            top: 100%;
            right: 0;
            transform-origin: 100% 0;
          }
        }
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="content">CSS Direction</div>
      <div class="dir top">Top -> Buttom</div>
      <div class="dir bottom">Bottom -> Top</div>
    </div>
  </body>
</html>
`;

const cssDirectionCss1 = `@layer {
  * {
    padding: 0;
    margin: 0;
  }

  body {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .box {
    width: 200px;
    height: 200px;
    background: gold;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
  }
  
  .dir {
    width: inherit;
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
`;

const cssDirection2Html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/style.css" />
    <title>Css Direction 2</title>
    <style>
      /* css direction */
      @layer {
        .box {
          overflow: hidden;
          position: relative;

          &:hover:not(:has(.director:hover)) .director {
            clip-path: inset(100% 0 0 0);
          }

          &:hover:not(:has(.director:hover)) .top {
            top: 0;
          }
        }

        .panel {
          position: absolute;
          width: 100%;
          height: 100%;
          transition: all 400ms ease;
        }

        .top {
          top: -100%;
          background: lightsalmon;
        }

        .bottom {
          bottom: -100%;
          background: lightgreen;
        }

        .director {
          position: absolute;
          inset: 0;
          background: red;
          z-index: 30;
          clip-path: inset(50% 0 0 0);
          opacity: 0;

          &:hover {
            clip-path: inset(0 0 0 0);
          }
          &:hover ~ .bottom {
            bottom: 0;
          }
        }
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="content">CSS Direction</div>
      <div class="director"></div>
      <div class="panel bottom">Bottom -> Top</div>
      <div class="panel top">Top -> Bottom</div>
    </div>
  </body>
</html>
`;

const cssDirectionCss2 = `@layer {
  * {
    padding: 0;
    margin: 0;
  }
  body {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .box {
    width: 200px;
    height: 200px;
    background: gold;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .panel {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
`;

export const cssDirection1 = {
  "/index.html": cssDirection1Html,
  "/style.css": cssDirectionCss1,
};

export const cssDirection2 = {
  "/index.html": cssDirection2Html,
  "/style.css": cssDirectionCss2,
};
