"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
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

export default function AlmacenamientoPage() {
  const [almacenados, setAlmacenados] = useState([
    {
      id: 1,
      fecha: "2025-04-07",
      cantidad: 150,
      ubicacion: "Refrigerador",
      etiqueta: "Mañana",
    },
    {
      id: 2,
      fecha: "2025-04-06",
      cantidad: 180,
      ubicacion: "Congelador",
      etiqueta: "Tarde",
    },
    {
      id: 3,
      fecha: "2025-04-05",
      cantidad: 120,
      ubicacion: "Congelador",
      etiqueta: "Noche",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [fecha, setFecha] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [ubicacion, setUbicacion] = useState("Refrigerador");
  const [etiqueta, setEtiqueta] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoAlmacenamiento = {
      id: almacenados.length + 1,
      fecha,
      cantidad: Number.parseInt(cantidad),
      ubicacion,
      etiqueta,
    };
    setAlmacenados([nuevoAlmacenamiento, ...almacenados]);
    setOpen(false);
    // Reset form
    setFecha("");
    setCantidad("");
    setUbicacion("Refrigerador");
    setEtiqueta("");
  };

  const eliminarAlmacenamiento = (id: number) => {
    setAlmacenados(almacenados.filter((item) => item.id !== id));
  };

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
              <span className="font-medium">150 ml</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Congelador</span>
              <span className="font-medium">300 ml</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Total</span>
              <span className="font-medium">450 ml</span>
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
        {almacenados.map((item) => (
          <Card key={item.id}>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium flex justify-between">
                <span>
                  {new Date(item.fecha).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "short",
                  })}
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
          </Card>
        ))}
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
