import { AccordionTrigger, Accordion, AccordionItem, AccordionContent } from './ui/accordion'


export default function Syarat({ requirement,flow,fee }: {requirement?:string,flow?:string,fee?:string}) {
    return (
        <section>
            <Accordion type="single" collapsible className="w-full p-2 px-4 rounded bg-white shadow-md" defaultValue="1">
                    <AccordionItem key={'requirement'} value={'requirement'}>
                        <AccordionTrigger>Syarat & Ketentuan</AccordionTrigger>
                        <AccordionContent>
                            <p dangerouslySetInnerHTML={{ __html: requirement || '' }}></p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem key={'flow'} value={'flow'}>
                        <AccordionTrigger>Alur Pelayanan</AccordionTrigger>
                        <AccordionContent>
                            <p dangerouslySetInnerHTML={{ __html: flow || '' }}></p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem key={'fee'} value={'fee'}>
                        <AccordionTrigger>Biaya</AccordionTrigger>
                        <AccordionContent>
                            <p dangerouslySetInnerHTML={{ __html: fee || '' }}></p>
                        </AccordionContent>
                    </AccordionItem>
            </Accordion>
        </section>
    )
}
