import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Droplets,
  ExternalLink,
  Home,
  Info,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RecursosPage() {
  return (
    <div className="container max-w-md mx-auto px-4 py-8 pb-20">
      <header className="flex items-center mb-6">
        <Link href="/" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-bold">Recursos y Consejos</h1>
      </header>

      <Tabs defaultValue="extraccion">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="extraccion">Extracción</TabsTrigger>
          <TabsTrigger value="almacenamiento">Almacenamiento</TabsTrigger>
          <TabsTrigger value="consejos">Consejos</TabsTrigger>
        </TabsList>

        <TabsContent value="extraccion">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Métodos de extracción</CardTitle>
                <CardDescription>
                  Diferentes técnicas para extraer leche materna
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Extracción manual</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm leading-relaxed mb-2">
                        La extracción manual es una técnica que no requiere
                        equipos especiales. Para realizarla correctamente:
                      </p>
                      <ol className="text-sm list-decimal pl-5 space-y-2">
                        <li>Lávate bien las manos antes de comenzar.</li>
                        <li>
                          Masajea suavemente el pecho en forma circular para
                          estimular el flujo de leche.
                        </li>
                        <li>
                          Coloca el pulgar y los dedos en forma de C alrededor
                          de la areola.
                        </li>
                        <li>
                          Presiona hacia atrás (hacia las costillas) y luego
                          comprime rítmicamente.
                        </li>
                        <li>
                          Rota la posición de los dedos para vaciar diferentes
                          conductos.
                        </li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Extractor manual</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm leading-relaxed mb-2">
                        Los extractores manuales son una opción económica y
                        portátil:
                      </p>
                      <ul className="text-sm list-disc pl-5 space-y-2">
                        <li>
                          Son ideales para uso ocasional o cuando estás fuera de
                          casa.
                        </li>
                        <li>
                          Asegúrate de que la copa se ajuste correctamente a tu
                          pezón.
                        </li>
                        <li>
                          Crea un ritmo constante de bombeo para imitar la
                          succión natural del bebé.
                        </li>
                        <li>
                          Alterna entre pechos cada 5-10 minutos para estimular
                          ambos lados.
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Extractor eléctrico</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm leading-relaxed mb-2">
                        Los extractores eléctricos son más eficientes para uso
                        regular:
                      </p>
                      <ul className="text-sm list-disc pl-5 space-y-2">
                        <li>
                          Permiten ajustar la velocidad y la intensidad de
                          succión.
                        </li>
                        <li>
                          Los modelos de doble bomba extraen leche de ambos
                          pechos simultáneamente.
                        </li>
                        <li>
                          Comienza con una intensidad baja y aumenta
                          gradualmente.
                        </li>
                        <li>Una sesión típica dura entre 15-20 minutos.</li>
                        <li>
                          Limpia todas las piezas después de cada uso según las
                          instrucciones del fabricante.
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Consejos para aumentar la producción</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-3">
                  <li className="flex gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>
                      Mantente bien hidratada bebiendo agua regularmente durante
                      el día.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>
                      Extrae leche con frecuencia, idealmente cada 2-3 horas
                      durante el día.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>
                      Masajea suavemente el pecho antes y durante la extracción.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>
                      Aplica compresas tibias en los pechos antes de extraer.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>
                      Intenta relajarte durante la extracción, el estrés puede
                      reducir la producción.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="almacenamiento">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Guía de almacenamiento</CardTitle>
                <CardDescription>
                  Tiempos recomendados para conservar la leche materna
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">
                      Temperatura ambiente (16-25°C)
                    </h3>
                    <p className="text-sm">
                      Hasta 4 horas es óptimo, hasta 6 horas es aceptable en
                      condiciones muy limpias.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Refrigerador (4°C)</h3>
                    <p className="text-sm">
                      Hasta 4 días es óptimo, hasta 5 días es aceptable en
                      condiciones muy limpias.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">
                      Congelador (-18°C o menos)
                    </h3>
                    <p className="text-sm">
                      Hasta 6 meses es óptimo, hasta 12 meses es aceptable.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Consejos para almacenar</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-3">
                  <li className="flex gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>
                      Usa recipientes limpios y esterilizados específicos para
                      leche materna.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>
                      Etiqueta cada recipiente con la fecha de extracción.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>
                      Almacena en pequeñas cantidades (60-120 ml) para minimizar
                      el desperdicio.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>
                      Deja espacio en el recipiente, ya que la leche se expande
                      al congelarse.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>
                      Guarda la leche en la parte trasera del refrigerador o
                      congelador, no en la puerta.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Descongelación y uso</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-3">
                  <li className="flex gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>
                      Descongela en el refrigerador durante la noche o bajo agua
                      tibia corriente.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>
                      No uses microondas para descongelar o calentar la leche
                      materna.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>
                      Una vez descongelada, usa la leche dentro de las 24 horas.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>
                      No vuelvas a congelar la leche materna descongelada.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="consejos">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Consejos generales</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-3">
                  <li className="flex gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>
                      Establece una rutina de extracción para mantener la
                      producción constante.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>
                      Cuida tu alimentación e hidratación para mantener una
                      buena producción de leche.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>
                      Busca un lugar tranquilo y cómodo para las sesiones de
                      extracción.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>
                      Mantén todos los equipos de extracción limpios y
                      esterilizados.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recursos adicionales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link
                    href="https://www.who.int/es/health-topics/breastfeeding"
                    className="flex items-center justify-between p-3 border rounded-md hover:bg-muted"
                  >
                    <span className="text-sm font-medium">
                      OMS - Lactancia materna
                    </span>
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                  <Link
                    href="https://www.unicef.org/es/nutricion/lactancia-materna"
                    className="flex items-center justify-between p-3 border rounded-md hover:bg-muted"
                  >
                    <span className="text-sm font-medium">
                      UNICEF - Nutrición y lactancia
                    </span>
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                  <Link
                    href="https://www.llli.org/es/"
                    className="flex items-center justify-between p-3 border rounded-md hover:bg-muted"
                  >
                    <span className="text-sm font-medium">
                      La Leche League International
                    </span>
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

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
            className="flex flex-col items-center text-rose-600"
          >
            <Info className="h-5 w-5" />
            <span className="text-xs">Recursos</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
