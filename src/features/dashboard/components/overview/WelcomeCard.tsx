import { Card, CardContent } from "@/components/ui/card";
import { Plane } from "lucide-react";


interface WelcomeCardProps {
  name: string;
}


export function WelcomeCard({
  name,
}: WelcomeCardProps) {

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  }


  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">

        <div>
          <h2 className="text-2xl font-semibold">
            {greeting}, {name} 👋
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Welcome back. Manage your bookings and travel activities here.
          </p>
        </div>


        <div className="hidden rounded-full bg-primary/10 p-4 md:block">
          <Plane className="h-8 w-8 text-primary" />
        </div>

      </CardContent>
    </Card>
  );
}