import React from 'react'

import Lottie from 'react-lottie-player'
// Alternatively:
// import Lottie from 'react-lottie-player/dist/LottiePlayerLight'

import lottieJson from '../../assets/lottie/roading.json'

export default function Example() {
  return (
    <Lottie
      loop
      animationData={lottieJson}
      play
      // style 은 선택
      style={{ width: 150, height: 150 }}
    />
  )
}