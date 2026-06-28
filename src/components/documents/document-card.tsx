import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type DocumentCardProps = {
  title: string;
  status: string;
  updatedAt: string;
  href: string;
};

export function DocumentCard({
  title,
  status,
  updatedAt,
  href,
}: DocumentCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardAction>
          <Badge variant="secondary">{status}</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Updated {updatedAt}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" asChild>
          <Link href={href}>Open</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
