import dynamic from 'next/dynamic'

const RubiksCube = dynamic(() => import('../components/RubiksCube'), { ssr: false })

export default function Home() {
  return (
    <div>
      <h1>Rubik's Cube Simulation</h1>
      <RubiksCube />
    </div>
  )
}