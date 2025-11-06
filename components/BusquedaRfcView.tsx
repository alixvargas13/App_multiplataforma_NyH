import { IconSymbol } from '@/components/ui/icon-symbol';
import { ConsultaRfcResponse, consultaService } from '@/services/consultaService';
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { busquedaRfcStyles as styles } from './ui/Styles/BusquedaRfcView.styles';

interface BusquedaRfcViewProps {
  onBuscar: (rfc: string) => void;
  resultados: ConsultaRfcResponse[] | null;
  loading: boolean;
}

export function BusquedaRfcView({ onBuscar, resultados, loading }: BusquedaRfcViewProps) {
  const [rfcInput, setRfcInput] = useState('');
  const [errorValidacion, setErrorValidacion] = useState('');
  const [pressedButtons, setPressedButtons] = useState<{[key: number]: boolean}>({}); // Estado para botones presionados
  const [nombreInput, setNombreInput] = useState('');
  const [resultadosApi, setResultadosApi] = useState<ConsultaRfcResponse[] | null>(null);
  const [loadingApi, setLoadingApi] = useState(false);
  // ANIMACIONES para efectos suaves
  const buttonAnimations = useRef<{[key: number]: Animated.Value}>({}).current;
  
  // Función para obtener o crear animación para un botón específico
  const getButtonAnimation = (index: number) => {
  if (!buttonAnimations[index]) {
    buttonAnimations[index] = new Animated.Value(0); // 0 = normal, 1 = presionado
  }
  return buttonAnimations[index];
  };
  
  // Detectar ancho de pantalla (simplificado)
  const screenWidth = Dimensions.get('window').width;
  const isNarrowScreen = screenWidth < 500; // Umbral más alto para testing
  
  // DEBUG: Ver qué está pasando
  const handleBuscar = async () => {
    setErrorValidacion('');
    if (!rfcInput.trim()) {
      setErrorValidacion('El RFC es obligatorio');
      return;
    }
    setLoadingApi(true);
    try {
      const resultados = await consultaService.consultarPorRfc(rfcInput.trim());
      
      // Filtrar resultados inválidos (con ceros, nulos y "Link")
      const resultadosValidos = resultados.filter(resultado => {
        // Si todos los valores importantes son 0 o null, y el nombre comercial es "Link", es inválido
        const esInvalido = (
          resultado.controlPersona === 0 &&
          resultado.controlMateria === 0 &&
          (!resultado.nombreComercial || resultado.nombreComercial.toLowerCase() === 'link')
        );
        return !esInvalido;
      });
      
      setResultadosApi(resultadosValidos);
    } catch (err) {
      setErrorValidacion('Error consultando la API');
      setResultadosApi([]);
    } finally {
      setLoadingApi(false);
    }
  };
  // ...existing code...
  // Eliminar función onBuscar antigua

  return (
    <View style={styles.busquedaContainer}>
      {/* Header */}
      <View style={styles.busquedaHeader}>
        <Image 
          source={require('@/assets/images/search-icon.png')} 
          style={{ width: 32, height: 32 }}
          tintColor="rgb(95,27,45)"
        />
        <Text style={styles.busquedaTitle}>Búsqueda por RFC</Text>
      </View>
      {/* Formulario */}
      <View style={styles.busquedaForm}>
        {/* Campo RFC */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>RFC:</Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputIconContainer}>
              <IconSymbol size={20} name="doc.text.fill" color="#6b7280" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Ej: ABCD123456XYZ"
              placeholderTextColor="#9ca3af"
              value={rfcInput}
              onChangeText={(text) => {
                setRfcInput(text.toUpperCase());
                setErrorValidacion('');
              }}
              autoCapitalize="characters"
              maxLength={13}
            />
          </View>
        </View>
        {/* Mensaje de error */}
        {errorValidacion ? (
          <Text style={styles.errorText}>{errorValidacion}</Text>
        ) : null}
        <TouchableOpacity 
          style={[styles.buscarButton, loadingApi && styles.buscarButtonDisabled]} 
          onPress={handleBuscar}
          disabled={loadingApi}
        >
          <Text style={styles.buscarButtonText}>
            {loadingApi ? 'Buscando...' : 'Buscar RFC'}
          </Text>
        </TouchableOpacity>
      </View>
      {/* Resultados */}
      {loadingApi ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Consultando información...</Text>
        </View>
      ) : resultadosApi && resultadosApi.length > 0 ? (
        <ScrollView 
          style={styles.resultadosContainer}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.resultadosTitle}>
            Resultados encontrados: {resultadosApi.length}
          </Text>
          {resultadosApi.map((resultado, index) => (
            <View key={index} style={styles.resultadoCard}>
              {/* HEADER CON RFC Y ESTADO */}
              <View style={styles.resultadoHeader}>
                <Text style={styles.resultadoRfc}>{resultado.rfc}</Text>
                <View style={[
                  styles.estadoBadge, 
                  resultado.situacion === 'ACTIVA' ? styles.estadoActivo : styles.estadoInactivo
                ]}>
                  <Text style={[
                    styles.estadoText,
                    resultado.situacion === 'ACTIVA' 
                      ? { color: '#059669' } 
                      : styles.estadoInactivoText
                  ]}>
                    {resultado.situacion}
                  </Text>
                </View>
              </View>
              {/* NOMBRE DE LA EMPRESA */}
              <Text style={styles.resultadoNombre}>{resultado.nombre}</Text>
              {/* NOMBRE COMERCIAL */}
              {resultado.nombreComercial && (
                <Text style={styles.resultadoComercial}>{resultado.nombreComercial}</Text>
              )}
              {/* TABLA DE INFORMACIÓN */}
              <View style={styles.tablaContainer}>
                {/* FILA 1: RFC Y REC - SIEMPRE BLANCA */}
                <View style={styles.tablaFila}>
                  <View style={styles.tablaColumna}>
                    <Text style={styles.tablaHeader}>RFC:</Text>
                    <Text style={styles.tablaCelda}>{resultado.rfc}</Text>
                  </View>
                  <View style={styles.tablaColumna}>
                    <Text style={styles.tablaHeader}>REC</Text>
                    <Text style={styles.tablaCelda}>{resultado.controlPersona}</Text>
                  </View>
                </View>
                {/* FILA 2: NOMBRE - SIEMPRE GRIS */}
                <View style={styles.tablaFilaCompletaAlterna}>
                  <Text style={styles.tablaHeader}>Nombre:</Text>
                  <Text style={styles.tablaCelda}>{resultado.nombre}</Text>
                </View>
                {/* FILA 3 y 4: LAYOUT RESPONSIVO PARA MATERIA, TIPO, SITUACIÓN, NOMBRE COMERCIAL */}
                {isNarrowScreen ? (
                  <>
                    <View style={styles.tablaFilaQuadrupleAlterna}>
                      <View style={styles.tablaColumnaEstrecha}>
                        <Text style={styles.tablaHeader}>Materia</Text>
                        <Text style={styles.tablaCelda}>{resultado.controlMateria}</Text>
                      </View>
                      <View style={styles.tablaColumnaEstrecha}>
                        <Text style={styles.tablaHeader}>Tipo</Text>
                        <Text style={styles.tablaCelda}>{resultado.tipoSucursal}</Text>
                      </View>
                    </View>
                    <View style={styles.tablaFila}>
                      <View style={styles.tablaColumnaEstrecha}>
                        <Text style={styles.tablaHeader}>Situación</Text>
                        <Text style={styles.tablaCelda}>{resultado.situacion}</Text>
                      </View>
                      <View style={styles.tablaColumnaEstrecha}>
                        <Text style={styles.tablaHeader}>Nombre comercial</Text>
                        <Text style={styles.tablaCelda}>
                          {resultado.nombreComercial || 'Link'}
                        </Text>
                      </View>
                    </View>
                  </>
                ) : (
                  <View style={styles.tablaFilaQuadrupleAlterna}>
                    <View style={styles.tablaColumnaEstrecha}>
                      <Text style={styles.tablaHeader}>Materia</Text>
                      <Text style={styles.tablaCelda}>{resultado.controlMateria}</Text>
                    </View>
                    <View style={styles.tablaColumnaEstrecha}>
                      <Text style={styles.tablaHeader}>Tipo</Text>
                      <Text style={styles.tablaCelda}>{resultado.tipoSucursal}</Text>
                    </View>
                    <View style={styles.tablaColumnaEstrecha}>
                      <Text style={styles.tablaHeader}>Situación</Text>
                      <Text style={styles.tablaCelda}>{resultado.situacion}</Text>
                    </View>
                    <View style={styles.tablaColumnaEstrecha}>
                      <Text style={styles.tablaHeader}>Nombre comercial</Text>
                      <Text style={styles.tablaCelda}>
                        {resultado.nombreComercial || 'Link'}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
              {/* BOTÓN VER MÁS - ESQUINA INFERIOR DERECHA */}
              <View style={styles.botonContainer}>
                <TouchableOpacity 
                  onPressIn={() => {
                    Animated.timing(getButtonAnimation(index), {
                      toValue: 1,
                      duration: 150,
                      useNativeDriver: false,
                    }).start();
                    setPressedButtons(prev => ({...prev, [index]: true}));
                  }}
                  onPressOut={() => {
                    Animated.timing(getButtonAnimation(index), {
                      toValue: 0,
                      duration: 200,
                      useNativeDriver: false,
                    }).start();
                    setPressedButtons(prev => ({...prev, [index]: false}));
                  }}
                  onPress={() => {
                    console.log('Ver más detalles de:', resultado.rfc);
                  }}
                  activeOpacity={1}
                >
                  <Animated.View style={[
                    styles.botonVerMas,
                    {
                      backgroundColor: getButtonAnimation(index).interpolate({
                        inputRange: [0, 1],
                        outputRange: ['#f8f9fa', '#17302D'],
                      }),
                    }
                  ]}>
                    <View style={styles.botonContent}>
                      <Animated.Text style={[
                        styles.botonVerMasText,
                        {
                          color: getButtonAnimation(index).interpolate({
                            inputRange: [0, 1],
                            outputRange: ['#17302D', '#C79B66'],
                          }),
                        }
                      ]}>Ver detalles</Animated.Text>
                      <Animated.View>
                        <IconSymbol 
                          name="chevron.right" 
                          size={14} 
                          color={pressedButtons[index] ? "#C79B66" : "#17302D"}
                          style={styles.botonIcon}
                        />
                      </Animated.View>
                    </View>
                  </Animated.View>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : resultadosApi && resultadosApi.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No se encontraron resultados para este RFC</Text>
        </View>
      ) : null}
    </View>
  );
}

/**
 * NOTA: Los estilos han sido movidos a BusquedaRfcView.styles.ts
 */