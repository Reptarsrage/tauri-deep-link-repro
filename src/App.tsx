import reactLogo from './assets/react.svg'
import { invoke } from '@tauri-apps/api/core'
import { onOpenUrl } from '@tauri-apps/plugin-deep-link'
import './App.css'
import { useEffect } from 'react'

const authUrl =
  'https://reddit.com/api/v1/authorize?client_id=hA3lSTjkXKSqoFxoTVG97g&duration=temporary&redirect_uri=my-tauri-app%3A%2F%2Freddit-oauth&response_type=code&scope=read&state=somestate'

function App() {
  useEffect(() => {
    const unlistenPromise = onOpenUrl((url) => {
        console.log('Received URL:', url);
        alert(`Received URL: ${url}`);
    });

    return () => {
        unlistenPromise.then(unlisten => unlisten());
    }
  }, [])

  async function open() {
    try {
      await invoke('open', { url: authUrl })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault()
          open()
        }}
      >
        <button type="submit">Authenticate</button>
      </form>
    </div>
  )
}

export default App
