import React, {
    FC,
    createContext,
    useContext,
    useState,
    useEffect,
    SetStateAction,
    Dispatch,
  } from 'react'
  
  const BasicAlleySplashScreenContext = createContext<Dispatch<SetStateAction<number>> | undefined>(
    undefined
  )
  
  const BasicAlleySplashScreenProvider: FC = ({children}) => {
    const [count, setCount] = useState(0)
    let visible = count > 0
  
    useEffect(() => {
      const splashScreen = document.getElementById('splash-screen')
  
      // Show SplashScreen
      if (splashScreen && visible) {
        splashScreen.classList.remove('hidden')
  
        return () => {
          splashScreen.classList.add('hidden')
        }
      }
  
      // Hide SplashScreen
      let timeout: number
      if (splashScreen && !visible) {
        timeout = window.setTimeout(() => {
          splashScreen.classList.add('hidden')
        }, 3000)
      }
  
      return () => {
        clearTimeout(timeout)
      }
    }, [visible])
  
    return (
      <BasicAlleySplashScreenContext.Provider value={setCount}>
        {children}
      </BasicAlleySplashScreenContext.Provider>
    )
  }
  
  const LayoutSplashScreen: FC<{visible?: boolean}> = ({visible = true}) => {
    // Everything are ready - remove splashscreen
    const setCount = useContext(BasicAlleySplashScreenContext)
  
    useEffect(() => {
      if (!visible) {
        return
      }
  
      if (setCount) {
        setCount((prev) => {
          return prev + 1
        })
      }
  
      return () => {
        if (setCount) {
          setCount((prev) => {
            return prev - 1
          })
        }
      }
    }, [setCount, visible])
  
    return null
  }
  
  export {BasicAlleySplashScreenProvider, LayoutSplashScreen}
  