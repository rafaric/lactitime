import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import type { Almacenamiento } from "@/context/app-context";

interface AlertaVencimientoProps {
  almacenamiento: Almacenamiento;
  mostrarDetalle?: boolean;
  mostrarNavegacion?: boolean;
}

export function AlertaVencimiento({
  almacenamiento,
  mostrarDetalle = true,
  mostrarNavegacion = true,
}: AlertaVencimientoProps) {
  // Calcular días desde la fecha de almacenamiento
  const fechaAlmacenamiento = new Date(almacenamiento.fecha);
  const hoy = new Date();

  // Asegurarnos de que ambas fechas estén en el mismo formato (sin horas)
  fechaAlmacenamiento.setHours(0, 0, 0, 0);
  hoy.setHours(0, 0, 0, 0);

  // Calcular la diferencia en días
  const diferenciaMilisegundos = hoy.getTime() - fechaAlmacenamiento.getTime();
  const diasTranscurridos = Math.floor(
    diferenciaMilisegundos / (1000 * 60 * 60 * 24)
  );

  // Definir límites según ubicación
  const esRefrigerador = almacenamiento.ubicacion === "Refrigerador";
  const diasLimite = esRefrigerador ? 4 : 180; // 4 días para refrigerador, 6 meses (180 días) para congelador
  const diasRestantes = diasLimite - diasTranscurridos;

  // Determinar el estado de la alerta
  let estado: "ok" | "advertencia" | "peligro" = "ok";
  if (diasRestantes <= 0) {
    estado = "peligro";
  } else if (esRefrigerador && diasRestantes <= 1) {
    estado = "advertencia";
  } else if (!esRefrigerador && diasRestantes <= 7) {
    estado = "advertencia";
  }

  // Si está en buen estado y no queremos mostrar detalle, no mostramos nada
  if (estado === "ok" && !mostrarDetalle) {
    return null;
  }

  // Formatear la fecha para mostrarla
  const fechaFormateada = fechaAlmacenamiento.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
  });

  // Crear un identificador para el elemento
  const elementId = `almacenamiento-${almacenamiento.id}`;

  // Configurar la alerta según el estado
  const configuracion = {
    ok: {
      icono: <CheckCircle className="h-4 w-4 text-green-500" />,
      titulo: "En buen estado",
      descripcion: `Quedan ${diasRestantes} días para su vencimiento.`,
      clase: "border-green-200 bg-green-50 text-green-800",
    },
    advertencia: {
      icono: <AlertTriangle className="h-4 w-4 text-amber-500" />,
      titulo: "Próximo a vencer",
      descripcion: esRefrigerador
        ? `Vence en ${diasRestantes} día${diasRestantes !== 1 ? "s" : ""}.`
        : `Vence en ${diasRestantes} días (${Math.floor(
            diasRestantes / 7
          )} semanas).`,
      clase: "border-amber-200 bg-amber-50 text-amber-800",
    },
    peligro: {
      icono: <AlertCircle className="h-4 w-4 text-rose-500" />,
      titulo: "Vencido",
      descripcion: `Venció hace ${Math.abs(diasRestantes)} día${
        Math.abs(diasRestantes) !== 1 ? "s" : ""
      }.`,
      clase: "border-rose-200 bg-rose-50 text-rose-800",
    },
  };

  const { icono, titulo, descripcion, clase } = configuracion[estado];

  return (
    <Alert className={clase}>
      <div className="flex flex-col gap-2">
        <div className="flex items-start">
          {icono}
          <div className="ml-2">
            <AlertTitle className="text-sm font-medium">{titulo}</AlertTitle>
            <AlertDescription className="text-xs mt-1">
              {descripcion}
            </AlertDescription>
          </div>
        </div>

        <div className="flex flex-col gap-1 ml-6">
          <div className="text-xs">
            <span className="font-medium">Cantidad:</span>{" "}
            {almacenamiento.cantidad} ml
          </div>
          <div className="text-xs">
            <span className="font-medium">Ubicación:</span>{" "}
            {almacenamiento.ubicacion}
          </div>
          {almacenamiento.etiqueta && (
            <div className="text-xs">
              <span className="font-medium">Etiqueta:</span>{" "}
              {almacenamiento.etiqueta}
            </div>
          )}
          <div className="text-xs">
            <span className="font-medium">Fecha:</span> {fechaFormateada}
          </div>
        </div>

        {mostrarNavegacion && (
          <div className="ml-6 mt-1">
            <Link
              href={`/almacenamiento?highlight=${almacenamiento.id}#${elementId}`}
            >
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs gap-1 border-current bg-white/50"
              >
                <ExternalLink className="h-3 w-3" />
                Ver detalle
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Alert>
  );
}
