import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import axios from 'axios'

import './styles/main.css'
import logo from './assets/logo-nlw-sports.svg'
import { GameBanner } from './components/GameBanner'
import { AdBanner } from './components/AdBanner'
import { CreateAdModal } from './components/CreateAdModal'

type Games = {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

function App() {
  const [games, setGames] = useState<Games[]>([])

  useEffect(() => {
    axios.get<Games[]>('http://localhost:3333/games').then(res => {
      setGames(res.data)
    })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logo} alt="Logo NLW" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{' '}
        <span className="bg-nlw-gradient bg-clip-text text-transparent">
          duo
        </span>{' '}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(game => (
          <GameBanner
            key={game.id}
            title={game.title}
            bannerUrl={game.bannerUrl}
            adsCount={game._count.ads}
          />
        ))}
      </div>

      <Dialog.Root>
        <AdBanner />

        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export { App }
