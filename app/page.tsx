import Link from "next/link";
import { CalendarDays, Droplets, Home, Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-rose-600">LactiTime</h1>
        <p className="text-muted-foreground mt-2">
          Organiza y registra tu leche materna
        </p>
      </header>

      <div className="grid gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Resumen</CardTitle>
            <CardDescription>Actividad reciente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Hoy</span>
                <span className="font-medium">120 ml</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Esta semana</span>
                <span className="font-medium">840 ml</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Almacenado</span>
                <span className="font-medium">450 ml</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Link href="/extracciones">
            <Button
              variant="outline"
              className="w-full h-24 flex flex-col gap-2"
            >
              <Droplets className="h-6 w-6 text-rose-500" />
              <span>Extracciones</span>
            </Button>
          </Link>
          <Link href="/calendario">
            <Button
              variant="outline"
              className="w-full h-24 flex flex-col gap-2"
            >
              <CalendarDays className="h-6 w-6 text-rose-500" />
              <span>Calendario</span>
            </Button>
          </Link>
          <Link href="/almacenamiento">
            <Button
              variant="outline"
              className="w-full h-24 flex flex-col gap-2"
            >
              <Home className="h-6 w-6 text-rose-500" />
              <span>Almacenamiento</span>
            </Button>
          </Link>
          <Link href="/recursos">
            <Button
              variant="outline"
              className="w-full h-24 flex flex-col gap-2"
            >
              <Info className="h-6 w-6 text-rose-500" />
              <span>Recursos</span>
            </Button>
          </Link>
        </div>

        <Card className="mt-4">
          <CardHeader className="pb-2">
            <CardTitle>Consejos del día</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Mantén una buena hidratación durante el día para ayudar con la
              producción de leche. Intenta beber un vaso de agua cada vez que
              amamantes o extraigas leche.
            </p>
          </CardContent>
        </Card>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t py-2 px-4">
        <div className="flex justify-around max-w-md mx-auto">
          <Link href="/" className="flex flex-col items-center text-rose-600">
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
