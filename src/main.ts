import {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  Events,
} from "matter-js";
import {
  generateRandomIndex,
  getObjectWidth,
  isMobileDevice,
  setPositionFromTopLeft,
} from "@/helper";
import SitenPng from "@/assets/siten.png";
import PoaPng from "@/assets/poa.png";
import EityanPng from "@/assets/eityan.png";
import IsseiPng from "@/assets/issei.png";
import FukkePng from "@/assets/fukke.png";
import BknkPng from "@/assets/bknk.png";
import NissiePng from "@/assets/nissie.png";
import SakakiPng from "@/assets/sakaki.png";
import MikiPng from "@/assets/miki.png";
import YanagiPng from "@/assets/yanagi.png";
import YutoPng from "@/assets/yuto.png";
import KeisukePng from "@/assets/keisuke.png";
import TakeruPng from "@/assets/takeru.png";

let gameStatus = "start"
const styles = {
  1: {
    render: {
      sprite: {
        single: true,
        texture: SitenPng,
        xScale: 1,
        yScale: 1,
      },
    },
    friction: 1,
    restitution: 0,
    label: "fruit_1",
  },
  2: {
    render: {
      sprite: {
        single: true,
        texture: PoaPng,
        xScale: 1,
        yScale: 1,
      },
    },
    friction: 1,
    restitution: 0,
    label: "fruit_2",
  },
  3: {
    render: {
      sprite: {
        single: true,
        texture: EityanPng,
        xScale: 1,
        yScale: 1,
      },
    },
    friction: 1,
    restitution: 0,
    label: "fruit_3",
  },
  4: {
    render: {
      sprite: {
        single: true,
        texture: IsseiPng,
        xScale: 1,
        yScale: 1,
      },
    },
    friction: 1,
    restitution: 0,
    label: "fruit_4",
  },
  5: {
    render: {
      sprite: {
        single: true,
        texture: FukkePng,
        xScale: 1,
        yScale: 1,
      },
    },
    friction: 1,
    restitution: 0,
    label: "fruit_5",
  },
  6: {
    render: {
      sprite: {
        single: true,
        texture: BknkPng,
        xScale: 1,
        yScale: 1,
      },
    },
    friction: 1,
    restitution: 0,
    label: "fruit_6",
  },
  7: {
    render: {
      sprite: {
        single: true,
        texture: NissiePng,
        xScale: 1,
        yScale: 1,
      },
    },
    friction: 1,
    restitution: 0,
    label: "fruit_7",
  },
  8: {
    render: {
      sprite: {
        single: true,
        texture: SakakiPng,
        xScale: 1,
        yScale: 1,
      },
    },
    friction: 1,
    restitution: 0,
    label: "fruit_8",
  },
  9: {
    render: {
      sprite: {
        single: true,
        texture: MikiPng,
        xScale: 1,
        yScale: 1,
      },
    },
    friction: 1,
    restitution: 0,
    label: "fruit_9",
  },
  10: {
    render: {
      sprite: {
        single: true,
        texture: YanagiPng,
        xScale: 1,
        yScale: 1,
      },
    },
    friction: 1,
    restitution: 0,
    label: "fruit_10",
  },
  11: {
    render: {
      sprite: {
        single: true,
        texture: YutoPng,
        xScale: 1,
        yScale: 1,
      },
    },
    friction: 1,
    restitution: 0,
    label: "fruit_11",
  },
  12: {
    render: {
      sprite: {
        single: true,
        texture: KeisukePng,
        xScale: 1,
        yScale: 1,
      },
    },
    friction: 1,
    restitution: 0,
    label: "fruit_12",
  },
  13: {
    render: {
      sprite: {
        single: true,
        texture: TakeruPng,
        xScale: 1,
        yScale: 1,
      },
    },
    friction: 1,
    restitution: 0,
    label: "fruit_13",
  }
};
const radius = [20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140];
const engine = Engine.create();
let score = 0;
const scoreElement = document.getElementById("score")!;
scoreElement.innerText = "0";
const canvasWidth = 600;
const canvasHeight = 1000;

const app = document.getElementById("app")!;
app.style.width = `${canvasWidth}px`;
app.style.height = `${canvasHeight}px`;


const render = Render.create({
  element: document.getElementById("app")!,
  engine: engine,
  options: {
    width: canvasWidth,
    height: canvasHeight,
    background: "#F0DFCC",
    wireframes: false,
  },
});

Render.run(render);

const runner = Runner.create();

Runner.run(runner, engine);

const ground = Bodies.rectangle(0, 0, canvasWidth, 20, {
  isStatic: true,
  render: {
    fillStyle: "#EFB81B",
  },
  friction: 1,
  restitution: 0,
});
setPositionFromTopLeft(
  ground,
  // center
  (canvasWidth - getObjectWidth(ground)) / 2,
  canvasHeight - 20,
);
const leftWall = Bodies.rectangle(0, 0, 20, canvasHeight - 200, {
  isStatic: true,
  render: {
    fillStyle: "#EFB81B",
  },
  friction: 1,
  restitution: 0,
})
setPositionFromTopLeft(leftWall, 0, 200);
const rightWall = Bodies.rectangle(0, 0, 20, canvasHeight - 200, {
  isStatic: true,
  render: {
    fillStyle: "#EFB81B",
  },
  friction: 1,
  restitution: 0,
})
setPositionFromTopLeft(rightWall, canvasWidth - 20, 200);
Composite.add(engine.world, [ground, leftWall, rightWall]);

let placeholderPosition = { x: 100, y: 250 };
const handleMove = (event: TouchEvent | MouseEvent) => {
  if (event.type === "touchmove") {
    event.preventDefault();
    // @ts-ignore
    var touch = event.touches[0];
    const rect = render.canvas.getBoundingClientRect();
    const scaleX = render.canvas.width / rect.width;
    const mouseX = (touch.clientX - rect.left) * scaleX;

    placeholderPosition = { x: mouseX, y: 250 };
  } else {
    const rect = render.canvas.getBoundingClientRect();
    const scaleX = render.canvas.width / rect.width;
    // @ts-ignore
    const mouseX = (event.clientX - rect.left) * scaleX;

    placeholderPosition = { x: mouseX, y: 250 };
  }
};
render.canvas.addEventListener("touchmove", handleMove);
if (!isMobileDevice()) {
  render.canvas.addEventListener("mousemove", handleMove);
}

// 1はじまり
let index = 1;
let nextIndex = generateRandomIndex(1, 5);

const nextElement = document.getElementById("next")!;
// @ts-ignore
nextElement.innerHTML = `<img src="${styles[nextIndex].render.sprite.texture}" />`;

const handleTouch = () => {
  // @ts-ignore
  const cherry = Bodies.circle(placeholderPosition.x, placeholderPosition.y, radius[index - 1], styles[index])
  Composite.add(engine.world, cherry);
  index = nextIndex;
  nextIndex = generateRandomIndex(1, 5);
  // @ts-ignore
  nextElement.innerHTML = `<img src="${styles[nextIndex].render.sprite.texture}" />`;

};
render.canvas.addEventListener("touchend", handleTouch);
if (!isMobileDevice()) {
  render.canvas.addEventListener("mouseup", handleTouch);
}
Events.on(render, "afterRender", function() {
  if (placeholderPosition) {
    var context = render.context;
    // @ts-ignore
    const imageData = styles[index].render.sprite.texture;
    const image = new Image();
    image.src = imageData;
    const scale = 1;
    context.drawImage(
      image,
      placeholderPosition.x - (image.width / 2) * scale,
      placeholderPosition.y - (image.height / 2) * scale,
      image.width * scale,
      image.height * scale,
    );
    context.globalAlpha = 1;
  }
});
Events.on(engine, "beforeUpdate", function() {
});
Events.on(engine, "afterUpdate", function() {
  // エンジンの世界にあるすべての物体を取得
  const bodies = Composite.allBodies(engine.world);
  // label: chotty count

  bodies.forEach(function(body) {
    if (gameStatus === "end") return;
    // fruitsが150pxを超えたらゲームオーバー
    if (!body.label.startsWith("fruit_")) return;
    if (body.position.y < 150) {
      gameStatus = "end"
      alert("GAME OVER\n score: " + score);
      window.location.reload();
    }
  });
});
Events.on(engine, "collisionStart", function({ pairs }) {
  pairs.forEach(({ bodyA, bodyB }) => {
    if (bodyA.label === bodyB.label) {
      // level: fruit_1 -> 1
      const level = parseInt(bodyA.label.split("_")[1]);
      const nextLevel = level + 1;
      const nextLabel = `fruit_${nextLevel}`;
      const nextRadius = radius[nextLevel - 1];

      const newX = (bodyA.position.x + bodyB.position.x) / 2;
      const newY = (bodyA.position.y + bodyB.position.y) / 2;
      // @ts-ignore
      const nextStyle = styles[nextLevel];
      const nextBody = Bodies.circle(newX, newY, nextRadius, {
        ...nextStyle,
        label: nextLabel,
      })

      Composite.remove(engine.world, bodyA);
      Composite.remove(engine.world, bodyB);
      Composite.add(engine.world, nextBody);
      score += level * 10;
      scoreElement.innerText = score.toString();
    }
  })
})

