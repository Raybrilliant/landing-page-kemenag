import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import pb from '@/lib/database';
import { BlurFade } from './magicui/blur-fade';

interface Struktur {
  name?: string;
  document?: string;
  description?: string;
  expand?: {
    category?: {
      name?: string;
    }
  };
}

export default function TeamGrid({ struktur }: { struktur: Struktur[] }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Struktur | null>(null);

  function handleOpen(item: Struktur) {
    setSelected(item);
    setOpen(true);
  }

  return (
    <>
      <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-10 max-sm:gap-5">
        {struktur.map((item, index) => (
          <BlurFade key={index} className="flex flex-col gap-1 items-center justify-center" delay={index * 0.1}>
            <button
              type="button"
              onClick={() => handleOpen(item)}
              className="group focus:outline-none"
            >
              <img
                src={pb.files.getURL(item,item?.document ?? '')}
                alt={item.name}
                className={`object-cover rounded-md group-hover:shadow-lg group-hover:rounded-none duration-300 cursor-pointer`}
              />

                <div className="text-2xl max-sm:text-lg font-bold group-hover:text-green-700 duration-300">{item.name}</div>
                <div className="text-sm max-sm:text-xs text-gray-500">{item.expand?.category?.name}</div>
            </button>

          </BlurFade>
        ))}
      </div>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen} >
        <DialogContent className="min-w-xl max-sm:min-w-0">
          <DialogHeader>
            <DialogTitle className="text-green-700">{selected?.name}</DialogTitle>
            <DialogDescription>{selected?.expand?.category?.name}</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5 max-h-[calc(100vh-20rem)] overflow-auto">
            <img
              src={pb.files.getURL(selected!,selected?.document ?? '')}
              alt={selected?.name}
              className="w-full object-cover mb-4 rounded-md"
            />
            <p className="text-sm leading-relaxed text-justify text-gray-600">{selected?.description ?? 'Belum ada deskripsi.'}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}