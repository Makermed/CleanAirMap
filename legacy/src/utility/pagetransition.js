import React, { memo } from "react";
import { TransitionGroup, Transition } from "react-transition-group";
import styled, { css, keyframes } from 'styled-components';


export const animations = {
  moveToLeft: {
    keyframes: keyframes`
      from { }
      to { transform: translateX(-100%) rotateZ(0.01deg); }
    `,
    duration: 600,
    timing: 'ease',
    fill: 'both'
  },
  moveFromLeft: {
    keyframes: keyframes`
      from {  transform: translateX(-100%) rotateZ(0.01deg); }
    `,
    duration: 600,
    timing: 'ease',
    fill: 'both'
  },
  moveToRight: {
    keyframes: keyframes`
      from { }
      to { transform: translateX(100%) rotateZ(0.01deg); }
    `,
    duration: 600,
    timing: 'ease',
    fill: 'both'
  },
  moveFromRight: {
    keyframes: keyframes`
      from { transform: translateX(100%) rotateZ(0.01deg); }
    `,
    duration: 600,
    timing: 'ease',
    fill: 'both'
  },
  moveToTop: {
    keyframes: keyframes`
      from { }
      to { transform: translateY(-100%) rotateZ(0.01deg); }
    `,
    duration: 600,
    timing: 'ease',
    fill: 'both'
  },
  moveFromTop: {
    keyframes: keyframes`
      from { transform: translateY(-100%) rotateZ(0.01deg); }
    `,
    duration: 600,
    timing: 'ease',
    fill: 'both'
  },
  moveToBottom: {
    keyframes: keyframes`
      from { }
      to { transform: translateY(100%) rotateZ(0.01deg); }
    `,
    duration: 600,
    timing: 'ease',
    fill: 'both'
  },
  moveFromBottom: {
    keyframes: keyframes`
      from { transform: translateY(100%) rotateZ(0.01deg); }
    `,
    duration: 600,
    timing: 'ease',
    fill: 'both'
  },
  fade: {
    keyframes: keyframes`
      from { }
      to { opacity: 0.3; }
    `,
    duration: 600,
    timing: 'ease',
    fill: 'both'
  },
  moveToLeftFade: {
    keyframes: keyframes`
      from { }
      to { opacity: 0.3; transform: translateX(-100%) rotateZ(0.01deg); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both'
  },
  moveFromLeftFade: {
    keyframes: keyframes`
      from { opacity: 0.3;  transform: translateX(-100%) rotateZ(0.01deg); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both'
  },
  moveToRightFade: {
    keyframes: keyframes`
      from { }
      to { opacity: 0.3;  transform: translateX(100%) rotateZ(0.01deg); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both'
  },
  moveFromRightFade: {
    keyframes: keyframes`
      from { opacity: 0.3; transform: translateX(100%) rotateZ(0.01deg); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both'
  },
  moveToTopFade: {
    keyframes: keyframes`
      from { }
      to { opacity: 0.3; transform: translateY(-100%) rotateZ(0.01deg); }
    `,
    duration: 600,
    timing: 'ease',
    fill: 'both'
  },
  moveFromTopFade: {
    keyframes: keyframes`
      from { opacity: 0.3; transform: translateY(-100%) rotateZ(0.01deg); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both'
  },
  moveToBottomFade: {
    keyframes: keyframes`
      from { }
      to { opacity: 0.3;  transform: translateY(100%) rotateZ(0.01deg); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both'
  },
  moveFromBottomFade: {
    keyframes: keyframes`
      from { opacity: 0.3; transform: translateY(100%) rotateZ(0.01deg); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both'
  },
  scaleDown: {
    keyframes: keyframes`
      from { }
      to { opacity: 0; transform: scale(0.8); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both'
  },
  scaleUp: {
    keyframes: keyframes`
	    from { opacity: 0;  transform: scale(0.8); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both'
  },
  scaleUpDown: {
    keyframes: keyframes`
      from { opacity: 0; transform: scale(1.2); }
    `,
    duration: 500,
    timing: 'ease',
    fill: 'both'
  },
  scaleDownUp: {
    keyframes: keyframes`
	    from { }
	    to { opacity: 0; transform: scale(1.2); }
    `,
    duration: 500,
    timing: 'ease',
    fill: 'both'
  },
  scaleDownCenter: {
    keyframes: keyframes`
      from { }
      to { opacity: 0; transform: scale(0.7); }
    `,
    duration: 400,
    timing: 'ease',
    fill: 'both'
  },
  scaleUpCenter: {
    keyframes: keyframes`
      from { opacity: 0;  transform: scale(0.7); }
    `,
    duration: 400,
    timing: 'ease',
    fill: 'both'
  },
  rotateRightSideFirst: {
    keyframes: keyframes`
      0% { }
      40% { transform: rotateY(15deg); opacity: 0.8; animation-timing-function: ease-out; }
      100% { transform: scale(0.8) translateZ(-200px); opacity:0; }
    `,
    duration: 800,
    timing: 'ease-in',
    fill: 'both',
    origin: '0% 50%'
  },
  rotateLeftSideFirst: {
    keyframes: keyframes`
      0% { }
      40% { transform: rotateY(-15deg); opacity: 0.8; animation-timing-function: ease-out; }
      100% { transform: scale(0.8) translateZ(-200px); opacity:0; }
    `,
    duration: 800,
    timing: 'ease-in',
    fill: 'both',
    origin: '0% 50%'
  },
  rotateTopSideFirst: {
    keyframes: keyframes`
      0% { }
      40% { transform: rotateX(15deg); opacity: 0.8; animation-timing-function: ease-out; }
      100% { transform: scale(0.8) translateZ(-200px); opacity:0; }
    `,
    duration: 800,
    timing: 'ease-in',
    fill: 'both',
    origin: '0% 50%'
  },
  rotateBottomSideFirst: {
    keyframes: keyframes`
      0% { }
      40% { transform: rotateX(-15deg); opacity: 0.8; animation-timing-function: ease-out; }
      100% {transform: scale(0.8) translateZ(-200px); opacity:0; }
    `,
    duration: 800,
    timing: 'ease-in',
    fill: 'both',
    origin: '0% 50%'
  },
  flipOutRight: {
    keyframes: keyframes`
      from { }
      to { transform: translateZ(-1000px) rotateY(90deg); opacity: 0.2; }
    `,
    duration: 500,
    timing: 'ease-in',
    fill: 'both',
    origin: '50% 50%'
  },
  flipInLeft: {
    keyframes: keyframes`
      from { transform: translateZ(-1000px) rotateY(-90deg); opacity: 0.2; }
    `,
    duration: 500,
    timing: 'ease-out',
    fill: 'both',
    origin: '50% 50%'
  },
  flipOutLeft: {
    keyframes: keyframes`
      from { }
      to { transform: translateZ(-1000px) rotateY(-90deg); opacity: 0.2; }
    `,
    duration: 500,
    timing: 'ease-in',
    fill: 'both',
    origin: '50% 50%'
  },
  flipInRight: {
    keyframes: keyframes`
      from { transform: translateZ(-1000px) rotateY(90deg); opacity: 0.2; }
    `,
    duration: 500,
    timing: 'ease-out',
    fill: 'both',
    origin: '50% 50%'
  },
  flipOutTop: {
    keyframes: keyframes`
      from { }
      to { transform: translateZ(-1000px) rotateX(90deg); opacity: 0.2; }
    `,
    duration: 500,
    timing: 'ease-in',
    fill: 'both',
    origin: '50% 50%'
  },
  flipInBottom: {
    keyframes: keyframes`
      from { transform: translateZ(-1000px) rotateX(-90deg); opacity: 0.2; }
    `,
    duration: 500,
    timing: 'ease-out',
    fill: 'both',
    origin: '50% 50%'
  },
  flipOutBottom: {
    keyframes: keyframes`
      from { }
      to { transform: translateZ(-1000px) rotateX(-90deg); opacity: 0.2; }
    `,
    duration: 500,
    timing: 'ease-in',
    fill: 'both',
    origin: '50% 50%'
  },
  flipInTop: {
    keyframes: keyframes`
      from { transform: translateZ(-1000px) rotateX(90deg); opacity: 0.2; }
    `,
    duration: 500,
    timing: 'ease-out',
    fill: 'both',
    origin: '50% 50%'
  },
  rotateFall: {
    keyframes: keyframes`
      0% { transform: rotateZ(0deg); }
      20% { transform: rotateZ(10deg); animation-timing-function: ease-out; }
      40% { transform: rotateZ(17deg); }
      60% { transform: rotateZ(16deg); }
      100% { transform: translateY(100%) rotateZ(17deg); }
    `,
    duration: 1000,
    timing: 'ease-in',
    fill: 'both',
    origin: '0% 0%'
  },
  rotateOutNewspaper: {
    keyframes: keyframes`
      from { }
      to { transform: translateZ(-3000px) rotateZ(360deg); opacity: 0; }
    `,
    duration: 500,
    timing: 'ease-in',
    fill: 'both',
    origin: '50% 50%'
  },
  rotateInNewspaper: {
    keyframes: keyframes`
      from { transform: translateZ(-3000px) rotateZ(-360deg); opacity: 0; }
    `,
    duration: 500,
    timing: 'ease-out',
    fill: 'both',
    origin: '50% 50%'
  },
  rotatePushLeft: {
    keyframes: keyframes`
      from { }
      to { opacity: 0; transform: rotateY(90deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '0% 50%'
  },
  rotatePushRight: {
    keyframes: keyframes`
      from { }
      to { opacity: 0; transform: rotateY(-90deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '100% 50%'
  },
  rotatePushTop: {
    keyframes: keyframes`
      from { }
      to { opacity: 0; transform: rotateX(-90deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '50% 0%'
  },
  rotatePushBottom: {
    keyframes: keyframes`
      from { }
      to { opacity: 0; transform: rotateX(90deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '50% 100%'
  },
  rotatePullRight: {
    keyframes: keyframes`
      from { opacity: 0; transform: rotateY(-90deg); }
    `,
    duration: 500,
    timing: 'ease',
    fill: 'both',
    origin: '100% 50%'
  },
  rotatePullLeft: {
    keyframes: keyframes`
      from { opacity: 0; transform: rotateY(90deg); }
    `,
    duration: 500,
    timing: 'ease',
    fill: 'both',
    origin: '0% 50%'
  },
  rotatePullTop: {
    keyframes: keyframes`
      from { opacity: 0; transform: rotateX(-90deg); }
    `,
    duration: 500,
    timing: 'ease',
    fill: 'both',
    origin: '50% 0%'
  },
  rotatePullBottom: {
    keyframes: keyframes`
      from { opacity: 0; transform: rotateX(90deg); }
    `,
    duration: 500,
    timing: 'ease',
    fill: 'both',
    origin: '50% 100%'
  },
  rotateFoldRight: {
    keyframes: keyframes`
      from { }
      to { opacity: 0; transform: translateX(100%) rotateY(90deg); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both',
    origin: '0% 50%'
  },
  rotateFoldLeft: {
    keyframes: keyframes`
      from { }
      to { opacity: 0; transform: translateX(-100%) rotateY(-90deg); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both',
    origin: '100% 50%'
  },
  rotateFoldTop: {
    keyframes: keyframes`
      from { }
      to { opacity: 0; transform: translateY(-100%) rotateX(90deg); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both',
    origin: '50% 100%'
  },
  rotateFoldBottom: {
    keyframes: keyframes`
      from { }
      to { opacity: 0; transform: translateY(100%) rotateX(-90deg); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both',
    origin: '50% 0%'
  },
  rotateUnfoldLeft: {
    keyframes: keyframes`
      from { opacity: 0; transform: translateX(-100%) rotateY(-90deg); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both',
    origin: '100% 50%'
  },
  rotateUnfoldRight: {
    keyframes: keyframes`
      from { opacity: 0;  transform: translateX(100%) rotateY(90deg); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both',
    origin: '0% 50%'
  },
  rotateUnfoldTop: {
    keyframes: keyframes`
      from { opacity: 0; transform: translateY(-100%) rotateX(90deg); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both',
    origin: '50% 100%'
  },
  rotateUnfoldBottom: {
    keyframes: keyframes`
      from { opacity: 0; transform: translateY(100%) rotateX(-90deg); }
    `,
    duration: 700,
    timing: 'ease',
    fill: 'both',
    origin: '50% 0%'
  },
  rotateRoomLeftOut: {
    keyframes: keyframes`
      from { }
      to { opacity: 0.3; transform: translateX(-100%) rotateY(90deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '100% 50%'
  },
  rotateRoomLeftIn: {
    keyframes: keyframes`
      from { opacity: 0.3; transform: translateX(100%) rotateY(-90deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '0% 50%'
  },
  rotateRoomRightOut: {
    keyframes: keyframes`
      from { }
      to { opacity: 0.3; transform: translateX(100%) rotateY(-90deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '0% 50%'
  },
  rotateRoomRightIn: {
    keyframes: keyframes`
      from { opacity: 0.3; transform: translateX(-100%) rotateY(90deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '100% 50%'
  },
  rotateRoomTopOut: {
    keyframes: keyframes`
      from { }
      to { opacity: 0.3; transform: translateY(-100%) rotateX(-90deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '50% 100%'
  },
  rotateRoomTopIn: {
    keyframes: keyframes`
      from { opacity: 0.3; transform: translateY(100%) rotateX(90deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '50% 0%'
  },
  rotateRoomBottomOut: {
    keyframes: keyframes`
      from { }
      to { opacity: 0.3; transform: translateY(100%) rotateX(90deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '50% 0%'
  },
  rotateRoomBottomIn: {
    keyframes: keyframes`
      from { opacity: 0.3; transform: translateY(-100%) rotateX(-90deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '50% 100%'
  },
  rotateCubeLeftOut: {
    keyframes: keyframes`
      0% { }
      50% { animation-timing-function: ease-out; transform: translateX(-50%) translateZ(-200px) rotateY(-45deg); }
      100% { opacity: 0.3; transform: translateX(-100%) rotateY(-90deg); }
    `,
    duration: 600,
    timing: 'ease-in',
    fill: 'both',
    origin: '100% 50%'
  },
  rotateCubeLeftIn: {
    keyframes: keyframes`
      0% { opacity: 0.3; transform: translateX(100%) rotateY(90deg); }
      50% { animation-timing-function: ease-out; transform: translateX(50%) translateZ(-200px) rotateY(45deg); }
    `,
    duration: 600,
    timing: 'ease-in',
    fill: 'both',
    origin: '0% 50%'
  },
  rotateCubeRightOut: {
    keyframes: keyframes`
      0% { }
      50% { animation-timing-function: ease-out; transform: translateX(50%) translateZ(-200px) rotateY(45deg); }
      100% { opacity: 0.3; transform: translateX(100%) rotateY(90deg); }
    `,
    duration: 600,
    timing: 'ease-in',
    fill: 'both',
    origin: '0% 50%'
  },
  rotateCubeRightIn: {
    keyframes: keyframes`
      0% { opacity: 0.3; transform: translateX(-100%) rotateY(-90deg); }
      50% { animation-timing-function: ease-out; transform: translateX(-50%) translateZ(-200px) rotateY(-45deg); }
    `,
    duration: 600,
    timing: 'ease-in',
    fill: 'both',
    origin: '100% 50%'
  },
  rotateCubeTopOut: {
    keyframes: keyframes`
      0% {}
      50% { animation-timing-function: ease-out; transform: translateY(-50%) translateZ(-200px) rotateX(45deg); }
      100% { opacity: 0.3; transform: translateY(-100%) rotateX(90deg); }
    `,
    duration: 600,
    timing: 'ease-in',
    fill: 'both',
    origin: '50% 100%'
  },
  rotateCubeTopIn: {
    keyframes: keyframes`
      0% { opacity: 0.3; transform: translateY(100%) rotateX(-90deg); }
      50% { animation-timing-function: ease-out; transform: translateY(50%) translateZ(-200px) rotateX(-45deg); }
    `,
    duration: 600,
    timing: 'ease-in',
    fill: 'both',
    origin: '50% 0%'
  },
  rotateCubeBottomOut: {
    keyframes: keyframes`
      0% { }
      50% { animation-timing-function: ease-out; transform: translateY(50%) translateZ(-200px) rotateX(-45deg); }
      100% { opacity: 0.3; -webkit-transform: translateY(100%) rotateX(-90deg); transform: translateY(100%) rotateX(-90deg); }
    `,
    duration: 600,
    timing: 'ease-in',
    fill: 'both',
    origin: '50% 0%'
  },
  rotateCubeBottomIn: {
    keyframes: keyframes`
      0% { opacity: 0.3; -webkit-transform: translateY(-100%) rotateX(90deg); transform: translateY(-100%) rotateX(90deg); }
      50% { animation-timing-function: ease-out; transform: translateY(-50%) translateZ(-200px) rotateX(45deg); }
    `,
    duration: 600,
    timing: 'ease-in',
    fill: 'both',
    origin: '50% 100%'
  },
  rotateCarouselLeftOut: {
    keyframes: keyframes`
      from { }
      to { opacity: 0.3; transform: translateX(-150%) scale(0.4) rotateY(-65deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '100% 50%'
  },
  rotateCarouselLeftIn: {
    keyframes: keyframes`
      from { opacity: 0.3; transform: translateX(200%) scale(0.4) rotateY(65deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '0% 50%'
  },
  rotateCarouselRightOut: {
    keyframes: keyframes`
      from { }
      to { opacity: 0.3; transform: translateX(200%) scale(0.4) rotateY(65deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '0% 50%'
  },
  rotateCarouselRightIn: {
    keyframes: keyframes`
      from { opacity: 0.3; transform: translateX(-200%) scale(0.4) rotateY(-65deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '100% 50%'
  },
  rotateCarouselTopOut: {
    keyframes: keyframes`
      from { }
      to { opacity: 0.3; transform: translateY(-200%) scale(0.4) rotateX(65deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '50% 100%'
  },
  rotateCarouselTopIn: {
    keyframes: keyframes`
      from { opacity: 0.3; transform: translateY(200%) scale(0.4) rotateX(-65deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '50% 0%'
  },
  rotateCarouselBottomOut: {
    keyframes: keyframes`
      from { }
      to { opacity: 0.3; transform: translateY(200%) scale(0.4) rotateX(-65deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '50% 0%'
  },
  rotateCarouselBottomIn: {
    keyframes: keyframes`
      from { opacity: 0.3; transform: translateY(-200%) scale(0.4) rotateX(65deg); }
    `,
    duration: 800,
    timing: 'ease',
    fill: 'both',
    origin: '50% 100%'
  },
  rotateSidesOut: {
    keyframes: keyframes`
      from { }
      to { opacity: 0; transform: translateZ(-500px) rotateY(90deg); }
    `,
    duration: 500,
    timing: 'ease-in',
    fill: 'both',
    origin: '-50% 50%'
  },
  rotateSidesIn: {
    keyframes: keyframes`
      from { opacity: 0; transform: translateZ(-500px) rotateY(-90deg); }
    `,
    duration: 500,
    timing: 'ease-in',
    fill: 'both',
    origin: '150% 50%'
  },
  rotateSlideOut: {
    keyframes: keyframes`
      0% { }
      25% { opacity: 0.5; transform: translateZ(-500px); }
      75% { opacity: 0.5; transform: translateZ(-500px) translateX(-200%); }
      100% { opacity: 0.5; transform: translateZ(-500px) translateX(-200%); }
    `,
    duration: 1000,
    timing: 'ease',
    fill: 'both'
  },
  rotateSlideIn: {
    keyframes: keyframes`
      0%, 25% { opacity: 0.5; transform: translateZ(-500px) translateX(200%); }
      75% { opacity: 0.5; transform: translateZ(-500px); }
      100% { opacity: 1; transform: translateZ(0) translateX(0); }
    `,
    duration: 1000,
    timing: 'ease',
    fill: 'both'
  }
};

export const presets = {
  moveToLeftFromRight: {
    exit: {
      name: 'moveToLeft'
    },
    enter: {
      name: 'moveFromRight'
    }
  },
  moveToRightFromLeft: {
    exit: {
      name: 'moveToRight'
    },
    enter: {
      name: 'moveFromLeft'
    }
  },
  moveToTopFromBottom: {
    exit: {
      name: 'moveToTop'
    },
    enter: {
      name: 'moveFromBottom'
    }
  },
  moveToBottomFromTop: {
    exit: {
      name: 'moveToBottom'
    },
    enter: {
      name: 'moveFromTop'
    }
  },
  fadeFromRight: {
    exit: {
      name: 'fade'
    },
    enter: {
      name: 'moveFromRight',
      onTop: true
    }
  },
  fadeFromLeft: {
    exit: {
      name: 'fade'
    },
    enter: {
      name: 'moveFromLeft',
      onTop: true
    }
  },
  fadeFromBottom: {
    exit: {
      name: 'fade'
    },
    enter: {
      name: 'moveFromBottom',
      onTop: true
    }
  },
  fadeFromTop: {
    exit: {
      name: 'fade'
    },
    enter: {
      name: 'moveFromTop',
      onTop: true
    }
  },
  fadeLeftFadeRight: {
    exit: {
      name: 'moveToLeftFade'
    },
    enter: {
      name: 'moveFromRightFade'
    }
  },
  fadeRightFadeLeft: {
    exit: {
      name: 'moveToRightFade'
    },
    enter: {
      name: 'moveFromLeftFade'
    }
  },
  fadeTopFadeBottom: {
    exit: {
      name: 'moveToTopFade'
    },
    enter: {
      name: 'moveFromBottomFade'
    }
  },
  fadeBottomFadeTop: {
    exit: {
      name: 'moveToBottomFade'
    },
    enter: {
      name: 'moveFromTopFade'
    }
  },
  scaleDownFromRight: {
    exit: {
      name: 'scaleDown'
    },
    enter: {
      name: 'moveFromRight',
      onTop: true
    }
  },
  scaleDownFromLeft: {
    exit: {
      name: 'scaleDown'
    },
    enter: {
      name: 'moveFromLeft',
      onTop: true
    }
  },
  scaleDownFromBottom: {
    exit: {
      name: 'scaleDown'
    },
    enter: {
      name: 'moveFromBottom',
      onTop: true
    }
  },
  scaleDownFromTop: {
    exit: {
      name: 'scaleDown'
    },
    enter: {
      name: 'moveFromTop',
      onTop: true
    }
  },
  scaleDownScaleDown: {
    exit: {
      name: 'scaleDown'
    },
    enter: {
      name: 'scaleUpDown',
      delay: 300
    }
  },
  scaleUpScaleUp: {
    exit: {
      name: 'scaleDownUp'
    },
    enter: {
      name: 'scaleUp',
      delay: 300
    }
  },
  moveToLeftScaleUp: {
    exit: {
      name: 'moveToLeft',
      onTop: true
    },
    enter: {
      name: 'scaleUp'
    }
  },
  moveToRightScaleUp: {
    exit: {
      name: 'moveToRight',
      onTop: true
    },
    enter: {
      name: 'scaleUp'
    }
  },
  moveToTopScaleUp: {
    exit: {
      name: 'moveToTop',
      onTop: true
    },
    enter: {
      name: 'scaleUp'
    }
  },
  moveToBottomScaleUp: {
    exit: {
      name: 'moveToBottom',
      onTop: true
    },
    enter: {
      name: 'scaleUp'
    }
  },
  scaleDownScaleUp: {
    exit: {
      name: 'scaleDownCenter'
    },
    enter: {
      name: 'scaleUpCenter',
      delay: 400
    }
  },
  glueLeftFromRight: {
    exit: {
      name: 'rotateRightSideFirst'
    },
    enter: {
      name: 'moveFromRight',
      delay: 200,
      onTop: true
    }
  },
  glueRightFromLeft: {
    exit: {
      name: 'rotateLeftSideFirst'
    },
    enter: {
      name: 'moveFromLeft',
      delay: 200,
      onTop: true
    }
  },
  glueBottomFromTop: {
    exit: {
      name: 'rotateTopSideFirst'
    },
    enter: {
      name: 'moveFromTop',
      delay: 200,
      onTop: true
    }
  },
  glueTopFromBottom: {
    exit: {
      name: 'rotateBottomSideFirst'
    },
    enter: {
      name: 'moveFromBottom',
      delay: 200,
      onTop: true
    }
  },
  flipRight: {
    exit: {
      name: 'flipOutRight'
    },
    enter: {
      name: 'flipInLeft',
      delay: 500
    }
  },
  flipLeft: {
    exit: {
      name: 'flipOutLeft'
    },
    enter: {
      name: 'flipInRight',
      delay: 500
    }
  },
  flipTop: {
    exit: {
      name: 'flipOutTop'
    },
    enter: {
      name: 'flipInBottom',
      delay: 500
    }
  },
  flipBottom: {
    exit: {
      name: 'flipOutBottom'
    },
    enter: {
      name: 'flipInTop',
      delay: 500
    }
  },
  fall: {
    exit: {
      name: 'rotateFall',
      onTop: true
    },
    enter: {
      name: 'scaleUp'
    }
  },
  newspaper: {
    exit: {
      name: 'rotateOutNewspaper'
    },
    enter: {
      name: 'rotateInNewspaper',
      delay: 500
    }
  },
  pushLeftFromRight: {
    exit: {
      name: 'rotatePushLeft'
    },
    enter: {
      name: 'moveFromRight'
    }
  },
  pushRightFromLeft: {
    exit: {
      name: 'rotatePushRight'
    },
    enter: {
      name: 'moveFromLeft'
    }
  },
  pushTopFromBottom: {
    exit: {
      name: 'rotatePushTop'
    },
    enter: {
      name: 'moveFromBottom'
    }
  },
  pushBottomFromTop: {
    exit: {
      name: 'rotatePushBottom'
    },
    enter: {
      name: 'moveFromTop'
    }
  },
  pushLeftPullRight: {
    exit: {
      name: 'rotatePushLeft'
    },
    enter: {
      name: 'rotatePullRight',
      delay: 180
    }
  },
  pushRightPullLeft: {
    exit: {
      name: 'rotatePushRight'
    },
    enter: {
      name: 'rotatePullLeft',
      delay: 180
    }
  },
  pushTopPullBottom: {
    exit: {
      name: 'rotatePushTop'
    },
    enter: {
      name: 'rotatePullBottom',
      delay: 180
    }
  },
  pushBottomPullTop: {
    exit: {
      name: 'rotatePushBottom'
    },
    enter: {
      name: 'rotatePullTop',
      delay: 180
    }
  },
  foldLeftFromRight: {
    exit: {
      name: 'rotateFoldLeft'
    },
    enter: {
      name: 'moveFromRightFade'
    }
  },
  foldRightFromLeft: {
    exit: {
      name: 'rotateFoldRight'
    },
    enter: {
      name: 'moveFromLeftFade'
    }
  },
  foldTopFromBottom: {
    exit: {
      name: 'rotateFoldTop'
    },
    enter: {
      name: 'moveFromBottomFade'
    }
  },
  foldBottomFromTop: {
    exit: {
      name: 'rotateFoldBottom'
    },
    enter: {
      name: 'moveFromTopFade'
    }
  },
  moveToRightUnfoldLeft: {
    exit: {
      name: 'moveToRightFade'
    },
    enter: {
      name: 'rotateUnfoldLeft'
    }
  },
  moveToLeftUnfoldRight: {
    exit: {
      name: 'moveToLeftFade'
    },
    enter: {
      name: 'rotateUnfoldRight'
    }
  },
  moveToBottomUnfoldTop: {
    exit: {
      name: 'moveToBottomFade'
    },
    enter: {
      name: 'rotateUnfoldTop'
    }
  },
  moveToTopUnfoldBottom: {
    exit: {
      name: 'moveToTopFade'
    },
    enter: {
      name: 'rotateUnfoldBottom'
    }
  },
  roomToLeft: {
    exit: {
      name: 'rotateRoomLeftOut',
      onTop: true
    },
    enter: {
      name: 'rotateRoomLeftIn'
    }
  },
  roomToRight: {
    exit: {
      name: 'rotateRoomRightOut',
      onTop: true
    },
    enter: {
      name: 'rotateRoomRightIn'
    }
  },
  roomToTop: {
    exit: {
      name: 'rotateRoomTopOut',
      onTop: true
    },
    enter: {
      name: 'rotateRoomTopIn'
    }
  },
  roomToBottom: {
    exit: {
      name: 'rotateRoomBottomOut',
      onTop: true
    },
    enter: {
      name: 'rotateRoomBottomIn'
    }
  },
  cubeToLeft: {
    exit: {
      name: 'rotateCubeLeftOut',
      onTop: true
    },
    enter: {
      name: 'rotateCubeLeftIn'
    }
  },
  cubeToRight: {
    exit: {
      name: 'rotateCubeRightOut',
      onTop: true
    },
    enter: {
      name: 'rotateCubeRightIn'
    }
  },
  cubeToTop: {
    exit: {
      name: 'rotateCubeTopOut',
      onTop: true
    },
    enter: {
      name: 'rotateCubeTopIn'
    }
  },
  cubeToBottom: {
    exit: {
      name: 'rotateCubeBottomOut',
      onTop: true
    },
    enter: {
      name: 'rotateCubeBottomIn'
    }
  },
  carouselToLeft: {
    exit: {
      name: 'rotateCarouselLeftOut',
      onTop: true
    },
    enter: {
      name: 'rotateCarouselLeftIn'
    }
  },
  carouselToRight: {
    exit: {
      name: 'rotateCarouselRightOut',
      onTop: true
    },
    enter: {
      name: 'rotateCarouselRightIn'
    }
  },
  carouselToTop: {
    exit: {
      name: 'rotateCarouselTopOut',
      onTop: true
    },
    enter: {
      name: 'rotateCarouselTopIn'
    }
  },
  carouselToBottom: {
    exit: {
      name: 'rotateCarouselBottomOut',
      onTop: true
    },
    enter: {
      name: 'rotateCarouselBottomIn'
    }
  },
  slides: {
    exit: {
      name: 'rotateSidesOut'
    },
    enter: {
      name: 'rotateSidesIn',
      delay: 200
    }
  },
  slide: {
    exit: {
      name: 'rotateSlideOut'
    },
    enter: {
      name: 'rotateSlideIn'
    }
  }
};

const createAnimationStyles = ({
  keyframes,
  delay,
  duration,
  timing,
  fill,
  origin,
  onTop
}) => css`
  animation-name: ${keyframes};
  animation-delay: ${delay};
  animation-duration: ${duration}ms;
  animation-timing-function: ${timing};
  animation-fill-mode: ${fill};
  transform-origin: ${origin || '50% 50%'};
  ${onTop &&
    css`
      z-index: 1;
    `}
`;

const stateMap = {
  entering: ({ enterAnimation }) => {
    return css`
      ${createAnimationStyles(enterAnimation)};
    `;
  },
  exiting: ({ exitAnimation }) => {
    return css`
      ${createAnimationStyles(exitAnimation)};
    `;
  }
};

const PageTransitionGroup = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const PageTransitionWrapper = styled.div`
  backface-visibility: hidden;
  left: 0;
  overflow: hidden;
  position: absolute;
  top: 0;
  width: 100%;
  will-change: tranform;
  ${({ state }) => stateMap[state]};
`;

const PageTransition = ({
  children,
  enterAnimation: enterAnimationOverride,
  exitAnimation: exitAnimationOverride,
  preset,
  transitionKey,
  ...rest
}) => {
  const selectEnterAnimation = () => {
    if (enterAnimationOverride) {
      if (typeof enterAnimationOverride === 'string') {
        return animations[enterAnimationOverride];
      }
      return {
        ...animations[enterAnimationOverride.name],
        delay: enterAnimationOverride.delay,
        onTop: enterAnimationOverride.onTop
      };
    }
    if (preset) {
      return {
        ...animations[presets[preset].enter.name],
        delay: presets[preset].enter.delay,
        onTop: presets[preset].enter.onTop
      };
    }
    return 'rotateSlideIn';
  };

  const selectExitAnimation = () => {
    if (exitAnimationOverride) {
      if (typeof exitAnimationOverride === 'string') {
        return animations[exitAnimationOverride];
      }
      return {
        ...animations[exitAnimationOverride.name],
        delay: exitAnimationOverride.delay,
        onTop: exitAnimationOverride.onTop
      };
    }
    if (preset) {
      return {
        ...animations[presets[preset].exit.name],
        delay: presets[preset].exit.delay,
        onTop: presets[preset].exit.onTop
      };
    }
    return 'rotateSlideIn';
  };

  const enterAnimation = selectEnterAnimation();
  const exitAnimation = selectExitAnimation();
  const timeout = Math.max(enterAnimation.duration, exitAnimation.duration);
  // console.log("EnterAnimation :", enterAnimation);
  // console.log("ExitAnimation :", exitAnimation);
  // console.log("timeout: ", timeout);

  return (
    <PageTransitionGroup {...rest}>
      <TransitionGroup component={null}>
        <Transition key={transitionKey} timeout={timeout}>
          {state => {
            // console.log("Transition state :", state);
            return (
              <PageTransitionWrapper
                enterAnimation={enterAnimation}
                exitAnimation={exitAnimation}
                state={state}
              >
                {children}
              </PageTransitionWrapper>
            );
          }}
        </Transition>
      </TransitionGroup>
    </PageTransitionGroup>
  );
}

export default memo(PageTransition);