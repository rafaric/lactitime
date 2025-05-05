"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Home,
  Info,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "@/context/app-context";

export default function CalendarioPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { extracciones } = useApp();
  const router = useRouter();

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const handleDayClick = (dateStr: string) => {
    // Navegar a la página de extracciones con la fecha seleccionada
    router.push(`/extracciones?fecha=${dateStr}`);
  };

  // Calcular estadísticas mensuales
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const extraccionesMes = extracciones.filter((e) => {
    const fecha = new Date(e.fecha);
    return fecha.getFullYear() === year && fecha.getMonth() === month;
  });

  const totalExtraidoMes = extraccionesMes.reduce(
    (sum, e) => sum + e.cantidad,
    0
  );
  const diasRegistrados = new Set(extraccionesMes.map((e) => e.fecha)).size;
  const promedioDiario =
    diasRegistrados > 0 ? Math.round(totalExtraidoMes / diasRegistrados) : 0;
  const totalExtracciones = extraccionesMes.length;

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const monthName = currentMonth.toLocaleString("es-ES", { month: "long" });

    const days = [];

    // Añadir días vacíos para alinear el primer día del mes
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }

    // Añadir los días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      const extraccionesDelDia = extracciones.filter(
        (e) => e.fecha === dateStr
      );
      const totalCantidad = extraccionesDelDia.reduce(
        (sum, e) => sum + e.cantidad,
        0
      );

      days.push(
        <div
          key={day}
          className={`relative h-10 w-10 flex flex-col items-center justify-center rounded-full 
            ${
              extraccionesDelDia.length > 0
                ? "cursor-pointer hover:bg-rose-100"
                : ""
            }
          `}
          onClick={() =>
            extraccionesDelDia.length > 0 && handleDayClick(dateStr)
          }
        >
          <span
            className={`text-sm ${
              extraccionesDelDia.length > 0 ? "font-bold text-rose-600" : ""
            }`}
          >
            {day}
          </span>
          {totalCantidad > 0 && (
            <span className="absolute bottom-0 text-[10px] text-rose-600">
              {totalCantidad}ml
            </span>
          )}
        </div>
      );
    }

    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <Button variant="ghost" size="sm" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-medium capitalize">
            {monthName} {year}
          </h2>
          <Button variant="ghost" size="sm" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          <div className="text-xs font-medium">D</div>
          <div className="text-xs font-medium">L</div>
          <div className="text-xs font-medium">M</div>
          <div className="text-xs font-medium">X</div>
          <div className="text-xs font-medium">J</div>
          <div className="text-xs font-medium">V</div>
          <div className="text-xs font-medium">S</div>
        </div>

        <div className="grid grid-cols-7 gap-1">{days}</div>
      </div>
    );
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-8 pb-20">
      <header className="flex items-center mb-6">
        <Link href="/" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-bold">Calendario</h1>
      </header>

      <Card className="mb-6">
        <CardContent className="py-4">{renderCalendar()}</CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-lg font-medium">Estadísticas mensuales</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="py-4 text-center">
              <p className="text-muted-foreground text-sm">Total extraído</p>
              <p className="text-2xl font-bold text-rose-600">
                {totalExtraidoMes} ml
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4 text-center">
              <p className="text-muted-foreground text-sm">Promedio diario</p>
              <p className="text-2xl font-bold text-rose-600">
                {promedioDiario} ml
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4 text-center">
              <p className="text-muted-foreground text-sm">Días registrados</p>
              <p className="text-2xl font-bold text-rose-600">
                {diasRegistrados}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-4 text-center">
              <p className="text-muted-foreground text-sm">Extracciones</p>
              <p className="text-2xl font-bold text-rose-600">
                {totalExtracciones}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t py-2 px-4">
        <div className="flex justify-around max-w-md mx-auto">
          <Link
            href="/"
            className="flex flex-col items-center text-muted-foreground"
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Inicio</span>
          </Link>
          <Link
            href="/extracciones"
            className="flex flex-col items-center text-muted-foreground"
          >
            <Droplets className="h-5 w-5" />
            <span className="text-xs">Extracciones</span>
          </Link>
          <Link
            href="/calendario"
            className="flex flex-col items-center text-rose-600"
          >
            <CalendarDays className="h-5 w-5" />
            <span className="text-xs">Calendario</span>
          </Link>
          <Link
            href="/recursos"
            className="flex flex-col items-center text-muted-foreground"
          >
            <Info className="h-5 w-5" />
            <span className="text-xs">Recursos</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
