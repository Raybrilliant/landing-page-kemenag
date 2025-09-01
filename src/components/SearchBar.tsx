
import { useState, useEffect } from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Button } from "./ui/button"

interface Layanan {
  id: string;
  name: string;
  category: string;
  expand: {
    category: {
      name: string;
    };
  };
}

export function SearchBar() {
  const [open, setOpen] = useState(false)
  const [layanan, setLayanan] = useState<Layanan[]>([])

  const getLayanan = async () => {
    const res = await fetch("/api/layanans");
    const data = await res.json();
    if (!res.ok) {
      console.log("Failed to fetch data");
    }
    setLayanan(data as Layanan[]);
  };

  const groupLayanan = (layanan: Layanan[]) => {
    const groupedLayanan: { [key: string]: Layanan[] } = {};
    layanan.forEach((layanan) => {
      if (!groupedLayanan[layanan.expand.category.name]) {
        groupedLayanan[layanan.expand.category.name] = [];
      }
      groupedLayanan[layanan.expand.category.name].push(layanan);
    });
    return groupedLayanan;
  };

  useEffect(() => {
    getLayanan();
  }, []);

  return (
    <>
      <Button variant="ghost" size="lg" className="relative z-10 mt-10 bg-green-600 text-white hover:scale-110 duration-500" onClick={() => setOpen(true)}>
        Ada yang bisa kami bantu ?
      </Button>
      
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Ketik layanan yang anda butuhkan..." />
        <CommandList>
          <CommandEmpty>Layanan Tidak Ditemukan.</CommandEmpty>
          {Object.entries(groupLayanan(layanan)).map(([category, layanan]) => (
            <CommandGroup heading={category} key={category}>
              {layanan.map((layanan) => (
                <CommandItem key={layanan.id} asChild>
                  <a href={`/layanan/sub-layanan/${layanan.id}`}>{layanan.name}</a>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}