import { useState, useEffect } from 'react'
import { Oval } from 'react-loader-spinner'
import UserCard from './components/UserCard/UserCard';
import './App.css';

const uiDisplayStatus = {
  loading: 'LOADING',
  success: "SUCCESS",
  failure: "FAILURE"
}

const avatarData = [
  { color: "#F06292", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=crimsonFalcon91" },
  { color: "#8E44AD", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=shadowWolf82" },
  { color: "#5DADE2", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=cosmicTiger73" },
  { color: "#00BCD4", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=neonDragon64" },
  { color: "#8BC34A", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=ironPhoenix55" },
  { color: "#CDDC39", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=emberLion46" },
  { color: "#FFEB3B", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=arcticFox37" },
  { color: "#FF9800", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=blazeEagle28" },
  { color: "#9C27B0", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=quantumBear19" },
  { color: "#03A9F4", avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=stellarPanda10" }
];



function App() {
  const [userData, setUserData] = useState([])
  const [currentStatus, setCurrentStatus] = useState(uiDisplayStatus.loading)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      if (response.ok) {
        const data = await response.json()
        const newData = data.map((each, i) => ({
          ...each,
          avatar: avatarData[i % avatarData.length].avatar,
          avatarBg: avatarData[i % avatarData.length].color
        }));

        setCurrentStatus(uiDisplayStatus.success)
        setUserData(newData)
        console.log(newData)
      } else {
        setCurrentStatus(uiDisplayStatus.failure)
      }

    }
    fetchData()
  }, [])

  const loading = () => (
    <div className='loader-container'>
      <div>
        <Oval
          color="blue" secondaryColor='blue' />
        <p className='load-para'>Please wait...</p>
      </div>
    </div>
  )

  const failure = () => (
    <div className='loader-container'>
      <h1>Opps Something wrong!</h1>
    </div>
  )

  const success = () => (
    <div className='success-main-container'>
      <div className='success-container'>
        {
          userData.map(each => <UserCard each={each} key={each.id} />)
        }
      </div>
    </div>
  )

  const renderFunction = () => {
    switch (currentStatus) {
      case (uiDisplayStatus.loading):
        return loading()
      case (uiDisplayStatus.failure):
        return failure()
      case (uiDisplayStatus.success):
        return success()
      default:
        return null
    }
  }
  return (
    <div className="main-container">
      {renderFunction()}
    </div>
  );
}

export default App;
