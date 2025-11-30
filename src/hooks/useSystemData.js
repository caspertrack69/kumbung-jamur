import { useState, useEffect } from 'react';


const generateHistory = (base, variance) => {
  return Array.from({ length: 20 }, (_, i) => ({
    time: i,
    value: parseFloat((base + Math.random() * variance - (variance / 2)).toFixed(1))
  }));
};

const useSystemData = () => {
  const [loading, setLoading] = useState(true);
  

  const [temp, setTemp] = useState(28.4);
  const [humidity, setHumidity] = useState(88);
  const [tempHistory, setTempHistory] = useState([]);
  const [humHistory, setHumHistory] = useState([]);


  const [devices, setDevices] = useState({
    mist: false,
    fan: true,
    light: false,
    auto: true
  });

 
  const [settings, setSettings] = useState({
    targetTemp: 26,
    targetHum: 90
  });

  
  useEffect(() => {
    setTempHistory(generateHistory(28, 2));
    setHumHistory(generateHistory(90, 5));
    
    setTimeout(() => setLoading(false), 2000);
  }, []);

  // Live Data Simulation
  useEffect(() => {
    if (loading) return;

    const interval = setInterval(() => {
      setTemp(prev => parseFloat((prev + (Math.random() * 0.4 - 0.2)).toFixed(1)));
      setHumidity(prev => Math.min(100, Math.max(0, parseInt(prev + (Math.random() * 4 - 2)))));

      setTempHistory(prev => [...prev.slice(1), { time: Date.now(), value: temp }]);
      setHumHistory(prev => [...prev.slice(1), { time: Date.now(), value: humidity }]);
    }, 3000);

    return () => clearInterval(interval);
  }, [loading, temp, humidity]);

  // Logic Control Device
  const toggleDevice = (device) => {
    if (devices.auto && device !== 'auto') return; 
    setDevices(prev => ({ ...prev, [device]: !prev[device] }));
  };

  return {
    loading,
    data: { temp, humidity, tempHistory, humHistory },
    devices,
    settings,
    actions: { toggleDevice, setSettings }
  };
};

export default useSystemData;