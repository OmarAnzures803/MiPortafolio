function Frame1() {
  return (
    <div className="[word-break:break-word] content-stretch flex font-['Clash_Display:Bold',sans-serif] gap-[44px] items-center leading-[48px] not-italic relative shrink-0 text-[#909090] text-[32px] whitespace-nowrap">
      <p className="relative shrink-0">Antecedentes Educativos</p>
      <p className="relative shrink-0">Herramientas</p>
      <p className="relative shrink-0">Carrera</p>
    </div>
  );
}

function Container1() {
  return <div className="bg-[rgba(255,255,255,0.15)] h-[2px] relative shrink-0 w-[959px]" data-name="Container" />;
}

function Frame() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-center justify-center p-[10px] relative size-full">
          <Frame1 />
          <Container1 />
        </div>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Atkinson_Hyperlegible:Bold',sans-serif] leading-[29.765px] not-italic relative shrink-0 text-[19.843px] text-white whitespace-nowrap">Ingeniería en Desarrollo y Gestión de Software</p>
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Atkinson_Hyperlegible:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#b0b0b0] text-[16px] whitespace-nowrap">Universidad Tecnológica de Puebla</p>
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Atkinson_Hyperlegible:Regular',sans-serif] leading-[21.6px] not-italic relative shrink-0 text-[#767676] text-[14.4px] whitespace-nowrap">2024 – 2026 (en proceso de titulación)</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph1 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Container5() {
  return <div className="absolute bg-[#767676] left-[-29px] rounded-[26843500px] size-[12px] top-[4px]" data-name="Container" />;
}

function Container3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Paragraph />
        <Container4 />
        <Container5 />
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Atkinson_Hyperlegible:Bold',sans-serif] leading-[29.765px] not-italic relative shrink-0 text-[19.843px] text-white whitespace-nowrap">Técnico Superior Universitario en Tecnologías de la Información</p>
      </div>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Atkinson_Hyperlegible:Regular',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#b0b0b0] text-[16px] whitespace-nowrap">Universidad Tecnológica de Puebla</p>
      </div>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Atkinson_Hyperlegible:Regular',sans-serif] leading-[21.6px] not-italic relative shrink-0 text-[#767676] text-[14.4px] whitespace-nowrap">2022 – 2024</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph4 />
        <Paragraph5 />
      </div>
    </div>
  );
}

function Container8() {
  return <div className="absolute bg-[#767676] left-[-29px] rounded-[26843500px] size-[12px] top-[4px]" data-name="Container" />;
}

function Container6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Paragraph3 />
        <Container7 />
        <Container8 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div aria-hidden className="absolute border-[#767676] border-l-[1.6px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[32px] items-start pl-[55.6px] py-[18px] relative size-full">
        <Container3 />
        <Container6 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-black max-w-[1320px] relative rounded-[42px] shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[40px] items-start max-w-[inherit] p-[48px] relative size-full">
        <Frame />
        <Container2 />
      </div>
    </div>
  );
}

export default function EducationSection() {
  return (
    <div className="content-stretch flex flex-col items-start px-[16px] py-[24px] relative size-full" data-name="EducationSection">
      <Container />
    </div>
  );
}