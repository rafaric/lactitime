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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function ExtraccionesPage() {
  const [extracciones, setExtracciones] = useState([
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

  const [open, setOpen] = useState(false);
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [metodo, setMetodo] = useState("Manual");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevaExtraccion = {
      id: extracciones.length + 1,
      fecha,
      hora,
      cantidad: Number.parseInt(cantidad),
      metodo,
    };
    setExtracciones([nuevaExtraccion, ...extracciones]);
    setOpen(false);
    // Reset form
    setFecha("");
    setHora("");
    setCantidad("");
    setMetodo("Manual");
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-8 pb-20">
      <header className="flex items-center mb-6">
        <Link href="/" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-bold">Registro de Extracciones</h1>
      </header>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Historial</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Nueva
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Registrar extracción</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="grid gap-2">
                <Label htmlFor="fecha">Fecha</Label>
                <Input
                  id="fecha"
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="hora">Hora</Label>
                <Input
                  id="hora"
                  type="time"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
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
                <Label>Método de extracción</Label>
                <RadioGroup value={metodo} onValueChange={setMetodo}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Manual" id="manual" />
                    <Label htmlFor="manual">Manual</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="Extractor manual"
                      id="extractor-manual"
                    />
                    <Label htmlFor="extractor-manual">Extractor manual</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="Extractor eléctrico"
                      id="extractor-electrico"
                    />
                    <Label htmlFor="extractor-electrico">
                      Extractor eléctrico
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <Button type="submit" className="w-full">
                Guardar
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {extracciones.map((extraccion) => (
          <Card key={extraccion.id}>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium flex justify-between">
                <span>
                  {new Date(extraccion.fecha).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
                <span>{extraccion.hora}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="py-2">
              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-muted-foreground">Cantidad</p>
                  <p className="font-medium">{extraccion.cantidad} ml</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Método</p>
                  <p className="font-medium">{extraccion.metodo}</p>
                </div>
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
            className="flex flex-col items-center text-rose-600"
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
