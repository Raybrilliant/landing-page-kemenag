import { AccordionTrigger, Accordion, AccordionItem, AccordionContent } from './ui/accordion'

interface SyaratProps {
    title: string
    content: string
}

export default function Syarat({ syarat }: {syarat: SyaratProps[]}) {
    return (
        <section>
            <Accordion type="single" collapsible className="w-full p-2 px-4 rounded bg-white shadow-md" defaultValue="1">
                {syarat.map((item, index) => (
                    <AccordionItem key={index} value={index.toString()}>
                        <AccordionTrigger>{item.title}</AccordionTrigger>
                        <AccordionContent>
                            <p>{item.content}</p>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    )
}
