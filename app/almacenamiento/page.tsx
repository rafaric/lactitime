"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Droplets,
  Home,
  Info,
  Plus,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApp } from "@/context/app-context";
import { AlertaVencimiento } from "@/components/alerta-vencimiento";

export default function AlmacenamientoPage() {
  const {
    almacenados,
    agregarAlmacenamiento,
    eliminarAlmacenamiento,
    obtenerTotalAlmacenado,
    calcularDiasRestantes,
  } = useApp();

  const [open, setOpen] = useState(false);
  const [fecha, setFecha] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [ubicacion, setUbicacion] = useState("Refrigerador");
  const [etiqueta, setEtiqueta] = useState("");

  // Referencia para el elemento resaltado
  const highlightedRef = useRef<HTMLDivElement>(null);

  // Obtener el ID del elemento a resaltar de los parámetros de URL
  const searchParams = useSearchParams();
  const highlightId = searchParams.get("highlight");

  // Efecto para hacer scroll al elemento resaltado
  useEffect(() => {
    if (highlightId && highlightedRef.current) {
      // Pequeño retraso para asegurar que el DOM está listo
      setTimeout(() => {
        highlightedRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 300);
    }
  }, [highlightId]);

  // Obtener totales para mostrar en el resumen
  const totalRefrigerador = obtenerTotalAlmacenado("Refrigerador");
  const totalCongelador = obtenerTotalAlmacenado("Congelador");
  const totalGeneral = obtenerTotalAlmacenado();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    agregarAlmacenamiento({
      fecha,
      cantidad: Number.parseInt(cantidad),
      ubicacion,
      etiqueta,
    });

    setOpen(false);
    // Reset form
    setFecha("");
    setCantidad("");
    setUbicacion("Refrigerador");
    setEtiqueta("");
  };

  // Ordenar almacenados por fecha de vencimiento (los más próximos a vencer primero)
  const almacenadosOrdenados = [...almacenados].sort((a, b) => {
    const diasRestantesA = calcularDiasRestantes(a);
    const diasRestantesB = calcularDiasRestantes(b);
    return diasRestantesA - diasRestantesB;
  });

  return (
    <div className="container max-w-md mx-auto px-4 py-8 pb-20">
      <header className="flex items-center mb-6">
        <Link href="/" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-bold">Almacenamiento</h1>
      </header>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Resumen de almacenamiento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Refrigerador</span>
              <span className="font-medium">{totalRefrigerador} ml</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Congelador</span>
              <span className="font-medium">{totalCongelador} ml</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Total</span>
              <span className="font-medium">{totalGeneral} ml</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Leche almacenada</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Nuevo
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registrar almacenamiento</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="grid gap-2">
                <Label htmlFor="fecha">Fecha de extracción</Label>
                <Input
                  id="fecha"
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cantidad">Cantidad (ml)</Label>
                <Input
                  id="cantidad"
                  type="number"
                  min="1"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ubicacion">Ubicación</Label>
                <Select value={ubicacion} onValueChange={setUbicacion}>
                  <SelectTrigger id="ubicacion">
                    <SelectValue placeholder="Seleccionar ubicación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Refrigerador">Refrigerador</SelectItem>
                    <SelectItem value="Congelador">Congelador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="etiqueta">Etiqueta (opcional)</Label>
                <Input
                  id="etiqueta"
                  placeholder="Ej: Mañana, Tarde, Noche"
                  value={etiqueta}
                  onChange={(e) => setEtiqueta(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full">
                Guardar
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {almacenadosOrdenados.map((item) => {
          const isHighlighted = highlightId === item.id.toString();
          const elementId = `almacenamiento-${item.id}`;

          return (
            <div
              key={item.id}
              id={elementId}
              ref={isHighlighted ? highlightedRef : null}
              className={`transition-all duration-500 ${
                isHighlighted ? "ring-2 ring-rose-500 shadow-lg" : ""
              }`}
            >
              <Card className="overflow-hidden">
                <CardHeader className="py-3">
                  <CardTitle className="text-sm font-medium flex justify-between">
                    <span>
                      {(() => {
                        const [year, month, day] = item.fecha
                          .split("-")
                          .map(Number);
                        const fecha = new Date(year, month - 1, day);
                        return fecha.toLocaleDateString("es-ES", {
                          day: "numeric",
                          month: "short",
                        });
                      })()}
                    </span>
                    <span>{item.etiqueta}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-muted-foreground">Cantidad</p>
                      <p className="font-medium">{item.cantidad} ml</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Ubicación</p>
                      <p className="font-medium">{item.ubicacion}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => eliminarAlmacenamiento(item.id)}
                      className="text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
                <div className="mt-1">
                  <AlertaVencimiento
                    almacenamiento={item}
                    mostrarNavegacion={false}
                  />
                </div>
              </Card>
            </div>
          );
        })}
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
            className="flex flex-col items-center text-muted-foreground"
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
