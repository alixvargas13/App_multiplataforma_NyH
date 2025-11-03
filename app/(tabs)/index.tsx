import { MenuPrincipal } from '@/components/MenuPrincipal';
import LoginView from '@/components/LoginView';
import { apiService, getErrorMessage, isApiSuccess } from '@/services/api';
import { consultaService } from '@/services/consultaService';
import React, { useState } from 'react';
import { Alert } from 'react-native';

export default function LoginScreen() {
  const [usuario, setUsuario] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [currentView, setCurrentView] = useState('inicio');
  const [nominaData, setNominaData] = useState<any>(null);
  const [hospedajeData, setHospedajeData] = useState<any>(null);
  const [busquedaData, setBusquedaData] = useState<any>(null);
  const [loadingData, setLoadingData] = useState(false);

  const handleGetNomina = async () => {
    setLoadingData(true);
    setCurrentView('nomina');
    
    try {
      console.log('Obteniendo datos de nómina...');
      const response = await apiService.getNomina();
      
      if (isApiSuccess(response)) {
        setNominaData(response);
        console.log('Datos de nómina obtenidos:', response);
      } else {
        const error = getErrorMessage(response);
        Alert.alert('Error', `No se pudieron obtener los datos de nómina: ${error}`);
      }
    } catch (error) {
      console.error('Error obteniendo nómina:', error);
      const mensaje = error instanceof Error ? error.message : 'Error de conexión';
      Alert.alert('Error de conexión', mensaje);
    } finally {
      setLoadingData(false);
    }
  };

  const handleGetHospedaje = async () => {
    setLoadingData(true);
    setCurrentView('hospedaje');
    
    try {
      console.log('Obteniendo datos de hospedaje...');
      const response = await apiService.getHospedaje();
      
      if (isApiSuccess(response)) {
        setHospedajeData(response);
        console.log('Datos de hospedaje obtenidos:', response);
      } else {
        const error = getErrorMessage(response);
        Alert.alert('Error', `No se pudieron obtener los datos de hospedaje: ${error}`);
      }
    } catch (error) {
      console.error('Error obteniendo hospedaje:', error);
      const mensaje = error instanceof Error ? error.message : 'Error de conexión';
      Alert.alert('Error de conexión', mensaje);
    } finally {
      setLoadingData(false);
    }
  };

  const handleBusquedaRfc = async (rfc: string) => {
    setLoadingData(true);
    setCurrentView('busqueda');
    
    try {
      console.log('Realizando búsqueda por RFC:', rfc);
      const resultados = await consultaService.consultarPorRfc(rfc);
      
      setBusquedaData(resultados);
      console.log('Resultados de búsqueda obtenidos:', resultados);
    } catch (error) {
      console.error('Error en búsqueda:', error);
      const mensaje = error instanceof Error ? error.message : 'Error de conexión';
      Alert.alert('Error en búsqueda', mensaje);
      setBusquedaData(null);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsuario('');
    setMenuVisible(false);
  };

  const handleLoginSuccess = (data: any) => {
    console.log('Login exitoso:', data);
    setUsuario(data.usuario);
    setIsLoggedIn(true);
  };

  const handleLoginError = (error: string) => {
    console.error('Error de login:', error);
  };

  if (isLoggedIn) {
    return (
      <MenuPrincipal
        usuario={usuario}
        menuVisible={menuVisible}
        setMenuVisible={setMenuVisible}
        currentView={currentView}
        setCurrentView={setCurrentView}
        nominaData={nominaData}
        hospedajeData={hospedajeData}
        busquedaData={busquedaData}
        setBusquedaData={setBusquedaData}
        loadingData={loadingData}
        handleGetNomina={handleGetNomina}
        handleGetHospedaje={handleGetHospedaje}
        handleBusquedaRfc={handleBusquedaRfc}
        handleLogout={handleLogout}
      />
    );
  }

  return (
    <LoginView
      onLoginSuccess={handleLoginSuccess}
      onLoginError={handleLoginError}
    />
  );
}
