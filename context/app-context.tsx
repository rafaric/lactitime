"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// Definir tipos para nuestros datos
export type Extraccion = {
  id: number;
  fecha: string;
  hora: string;
  cantidad: number;
  metodo: string;
};

export type Almacenamiento = {
  id: number;
  fecha: string;
  cantidad: number;
  ubicacion: string;
  etiqueta: string;
};

// Definir el tipo para nuestro contexto
type AppContextType = {
  extracciones: Extraccion[];
  almacenados: Almacenamiento[];
  agregarExtraccion: (extraccion: Omit<Extraccion, "id">) => void;
  agregarAlmacenamiento: (almacenamiento: Omit<Almacenamiento, "id">) => void;
  eliminarAlmacenamiento: (id: number) => void;
  obtenerTotalExtracciones: (periodo?: "hoy" | "semana" | "mes") => number;
  obtenerTotalAlmacenado: (ubicacion?: string) => number;
  obtenerAlmacenamientosProximosAVencer: () => Almacenamiento[];
  obtenerAlmacenamientosVencidos: () => Almacenamiento[];
  calcularDiasRestantes: (almacenamiento: Almacenamiento) => number;
};

// Crear el contexto
const AppContext = createContext<AppContextType | undefined>(undefined);

// Proveedor del contexto
export function AppProvider({ children }: { children: ReactNode }) {
  // Estados para nuestros datos
  const [extracciones, setExtracciones] = useState<Extraccion[]>([]);
  const [almacenados, setAlmacenados] = useState<Almacenamiento[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const loadedExtracciones = localStorage.getItem("extracciones");
    const loadedAlmacenados = localStorage.getItem("almacenados");

    if (loadedExtracciones) {
      setExtracciones(JSON.parse(loadedExtracciones));
    } else {
      // Datos de ejemplo si no hay nada guardado
      setExtracciones([
        {
          id: 1,
          fecha: "2025-04-08",
          hora: "08:30",
          cantidad: 60,
          metodo: "Manual",
        },
        {
          id: 2,
          fecha: "2025-04-08",
          hora: "14:15",
          cantidad: 80,
          metodo: "Extractor eléctrico",
        },
        {
          id: 3,
          fecha: "2025-04-07",
          hora: "19:45",
          cantidad: 70,
          metodo: "Extractor manual",
        },
      ]);
    }

    if (loadedAlmacenados) {
      setAlmacenados(JSON.parse(loadedAlmacenados));
    } else {
      // Datos de ejemplo si no hay nada guardado
      const hoy = new Date();
      const hace3Dias = new Date(hoy);
      hace3Dias.setDate(hoy.getDate() - 3);

      const hace5Meses = new Date(hoy);
      hace5Meses.setMonth(hoy.getMonth() - 5);
      hace5Meses.setDate(hoy.getDate() - 25); // 5 meses y 25 días (casi 6 meses)

      setAlmacenados([
        {
          id: 1,
          fecha: hoy.toISOString().split("T")[0],
          cantidad: 150,
          ubicacion: "Refrigerador",
          etiqueta: "Mañana",
        },
        {
          id: 2,
          fecha: hace3Dias.toISOString().split("T")[0],
          cantidad: 180,
          ubicacion: "Refrigerador",
          etiqueta: "Tarde",
        },
        {
          id: 3,
          fecha: hace5Meses.toISOString().split("T")[0],
          cantidad: 120,
          ubicacion: "Congelador",
          etiqueta: "Noche",
        },
      ]);
    }

    setIsLoaded(true);
  }, []);

  // Guardar datos en localStorage cuando cambien
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("extracciones", JSON.stringify(extracciones));
      localStorage.setItem("almacenados", JSON.stringify(almacenados));
    }
  }, [extracciones, almacenados, isLoaded]);

  // Función para agregar una nueva extracción
  const agregarExtraccion = (extraccion: Omit<Extraccion, "id">) => {
    const nuevaExtraccion = {
      ...extraccion,
      id: Date.now(),
    };
    setExtracciones([nuevaExtraccion, ...extracciones]);
  };

  // Función para agregar un nuevo almacenamiento
  const agregarAlmacenamiento = (
    almacenamiento: Omit<Almacenamiento, "id">
  ) => {
    const nuevoAlmacenamiento = {
      ...almacenamiento,
      id: Date.now(),
    };
    setAlmacenados([nuevoAlmacenamiento, ...almacenados]);
  };

  // Función para eliminar un almacenamiento
  const eliminarAlmacenamiento = (id: number) => {
    setAlmacenados(almacenados.filter((item) => item.id !== id));
  };

  // Función para obtener el total de extracciones en un periodo
  const obtenerTotalExtracciones = (periodo?: "hoy" | "semana" | "mes") => {
    if (!periodo) {
      return extracciones.reduce(
        (total, extraccion) => total + extraccion.cantidad,
        0
      );
    }

    const hoy = new Date();
    const fechaInicio = new Date();

    if (periodo === "semana") {
      fechaInicio.setDate(hoy.getDate() - 7);
    } else if (periodo === "mes") {
      fechaInicio.setMonth(hoy.getMonth() - 1);
    } else {
      // Hoy
      fechaInicio.setHours(0, 0, 0, 0);
    }

    return extracciones
      .filter((extraccion) => new Date(extraccion.fecha) >= fechaInicio)
      .reduce((total, extraccion) => total + extraccion.cantidad, 0);
  };

  // Función para obtener el total almacenado
  const obtenerTotalAlmacenado = (ubicacion?: string) => {
    if (!ubicacion) {
      return almacenados.reduce((total, item) => total + item.cantidad, 0);
    }

    return almacenados
      .filter((item) => item.ubicacion === ubicacion)
      .reduce((total, item) => total + item.cantidad, 0);
  };

  // Función para calcular días restantes de un almacenamiento
  const calcularDiasRestantes = (almacenamiento: Almacenamiento) => {
    const fechaAlmacenamiento = new Date(almacenamiento.fecha);
    const hoy = new Date();

    // Asegurarnos de que ambas fechas estén en el mismo formato (sin horas)
    fechaAlmacenamiento.setHours(0, 0, 0, 0);
    hoy.setHours(0, 0, 0, 0);

    // Calcular la diferencia en días
    const diferenciaMilisegundos =
      hoy.getTime() - fechaAlmacenamiento.getTime();
    const diasTranscurridos = Math.floor(
      diferenciaMilisegundos / (1000 * 60 * 60 * 24)
    );

    // Definir límites según ubicación
    const diasLimite = almacenamiento.ubicacion === "Refrigerador" ? 4 : 180; // 4 días para refrigerador, 6 meses (180 días) para congelador

    return diasLimite - diasTranscurridos;
  };

  // Función para obtener almacenamientos próximos a vencer
  const obtenerAlmacenamientosProximosAVencer = () => {
    return almacenados.filter((item) => {
      const diasRestantes = calcularDiasRestantes(item);
      if (item.ubicacion === "Refrigerador") {
        return diasRestantes > 0 && diasRestantes <= 1; // Advertencia 1 día antes para refrigerador
      } else {
        return diasRestantes > 0 && diasRestantes <= 7; // Advertencia 1 semana antes para congelador
      }
    });
  };

  // Función para obtener almacenamientos vencidos
  const obtenerAlmacenamientosVencidos = () => {
    return almacenados.filter((item) => calcularDiasRestantes(item) <= 0);
  };

  // Valor del contexto
  const value = {
    extracciones,
    almacenados,
    agregarExtraccion,
    agregarAlmacenamiento,
    eliminarAlmacenamiento,
    obtenerTotalExtracciones,
    obtenerTotalAlmacenado,
    obtenerAlmacenamientosProximosAVencer,
    obtenerAlmacenamientosVencidos,
    calcularDiasRestantes,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Hook personalizado para usar el contexto
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp debe ser usado dentro de un AppProvider");
  }
  return context;
}
