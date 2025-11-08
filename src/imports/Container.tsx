import svgPaths from "./svg-vh2ynnyyum";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['PingFang_TC:Semibold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-gray-900 text-nowrap">
        <p className="leading-[28px] whitespace-pre">收件匣</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['PingFang_TC:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-500 text-nowrap">
        <p className="leading-[20px] whitespace-pre">客戶訊息管理</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Heading />
      <Container />
    </div>
  );
}

function Container2() {
  return (
    <div className="box-border content-stretch flex items-center pl-[16px] pr-0 py-0 relative shrink-0" data-name="Container">
      <Container1 />
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path d={svgPaths.p1c3efea0} id="Vector" stroke="var(--stroke-0, #4B5563)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p25877f40} id="Vector_2" stroke="var(--stroke-0, #4B5563)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="box-border content-stretch flex items-start p-[8px] relative rounded-[8px] shrink-0" data-name="Button">
      <Svg />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Button />
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="SVG">
          <path d={svgPaths.p23b7140} id="Vector" stroke="var(--stroke-0, #EAB308)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundShadow() {
  return (
    <div className="bg-white box-border content-stretch flex items-center justify-center overflow-clip relative rounded-[9999px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] shrink-0 size-[20px]" data-name="Background+Shadow">
      <Svg1 />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-gray-200 box-border content-stretch flex h-[24px] items-center p-[2px] relative rounded-[9999px] shrink-0 w-[48px]" data-name="Button - 切換到深色模式">
      <BackgroundShadow />
    </div>
  );
}

function ButtonMargin() {
  return (
    <div className="box-border content-stretch flex flex-col h-[24px] items-start pl-[16px] pr-0 py-0 relative shrink-0 w-[64px]" data-name="Button - 切換到深色模式:margin">
      <Button1 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-nowrap text-white">
        <p className="leading-[20px] whitespace-pre">C</p>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background">
      <Container4 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-900 text-nowrap">
        <p className="leading-[20px] whitespace-pre">Cloudia</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">shiau.cloudia@gmail.com</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container5 />
      <Container6 />
    </div>
  );
}

function Margin() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[12px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <Container7 />
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[32px]" data-name="Button">
      <div className="flex flex-col font-['Apple_Symbols:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-gray-500 text-nowrap">
        <p className="leading-[24px] whitespace-pre">⋮</p>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[12px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <Button2 />
    </div>
  );
}

function VerticalBorder() {
  return (
    <div className="box-border content-stretch flex items-center pl-[17px] pr-0 py-0 relative shrink-0" data-name="VerticalBorder">
      <div aria-hidden="true" className="absolute border-[0px_0px_0px_1px] border-neutral-200 border-solid inset-0 pointer-events-none" />
      <Background />
      <Margin />
      <Margin1 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[16px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <VerticalBorder />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Container3 />
      <ButtonMargin />
      <Margin2 />
    </div>
  );
}

function Container9() {
  return (
    <div className="basis-0 content-stretch flex grow items-center justify-between min-h-px min-w-px relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container8 />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-white h-[73px] relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-neutral-200 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="box-border content-stretch flex flex-col h-[73px] items-start justify-center pb-[21px] pt-[20px] px-[24px] relative w-full">
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['PingFang_TC:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap">
        <p className="leading-[16px] whitespace-pre">使用量</p>
      </div>
    </div>
  );
}

function Svg2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="SVG">
          <path clipRule="evenodd" d={svgPaths.p11304070} fill="var(--fill-0, #6B7280)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Svg2 />
    </div>
  );
}

function Margin3() {
  return (
    <div className="box-border content-stretch flex flex-col items-start pl-[4px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <Container11 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Container10 />
      <Margin3 />
    </div>
  );
}

function Container13() {
  return (
    <div className="box-border content-stretch flex flex-col items-start mr-[-2.842e_-14px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-green-600 text-nowrap">
        <p className="leading-[16px] whitespace-pre">0/100</p>
      </div>
    </div>
  );
}

function Svg3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container14() {
  return (
    <div className="box-border content-stretch flex flex-col items-start p-[4px] relative rounded-[4px] shrink-0" data-name="Container">
      <Svg3 />
    </div>
  );
}

function Margin4() {
  return (
    <div className="box-border content-stretch flex flex-col items-start mr-[-2.842e_-14px] pl-[8px] pr-0 py-0 relative shrink-0" data-name="Margin">
      <Container14 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Container13 />
      <Margin4 />
    </div>
  );
}

function Container16() {
  return (
    <div className="box-border content-stretch flex items-center justify-between p-[8px] relative rounded-[8px] shrink-0 w-[303px]" data-name="Container">
      <Container12 />
      <Container15 />
    </div>
  );
}

function Container17() {
  return (
    <div className="box-border content-stretch flex flex-col items-start overflow-clip px-0 py-[1.5px] relative shrink-0 w-[133px]" data-name="Container">
      <div className="flex flex-col font-['PingFang_TC:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-400 text-nowrap">
        <p className="leading-[normal] whitespace-pre">搜尋對話（即時過濾 / Enter 搜尋全部）</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row justify-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex items-start justify-center pl-[41px] pr-[113px] py-[9px] relative w-full">
          <Container17 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Svg4() {
  return (
    <div className="absolute left-[12px] size-[16px] top-1/2 translate-y-[-50%]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d="M14 14L11.1067 11.1067" id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p107a080} id="Vector_2" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['PingFang_TC:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-white">
        <p className="leading-[20px] whitespace-pre">搜尋</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-[#e7c419] bottom-[1.8%] box-border content-stretch flex items-center justify-center px-[13px] py-[7px] right-[8px] rounded-[8px] top-[4.88%]" data-name="Button">
      <Container18 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Input />
      <Svg4 />
      <Button3 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['PingFang_TC:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-gray-500 text-nowrap">
        <p className="leading-[20px] whitespace-pre">尚無標籤</p>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-gray-100 box-border content-stretch flex items-center px-[13px] py-[9px] relative rounded-[6px] shrink-0 w-[167px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-gray-300 border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Container20 />
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-center overflow-clip relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['PingFang_TC:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a4a4a] text-[14px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">全部狀態</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[16px]" data-name="Frame">
      <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 6">
            <path d={svgPaths.p32098840} id="Vector" stroke="var(--stroke-0, #4A4A4A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Svg5() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative shrink-0 size-[16px]" data-name="SVG">
      <Frame />
    </div>
  );
}

function SvgMargin() {
  return (
    <div className="box-border content-stretch flex flex-col h-[16px] items-start pl-[8px] pr-0 py-0 relative shrink-0 w-[24px]" data-name="SVG:margin">
      <Svg5 />
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[13px] py-[9px] relative w-full">
          <Container21 />
          <SvgMargin />
        </div>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[112px]" data-name="Container">
      <Button4 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <BackgroundBorder />
      <Container22 />
    </div>
  );
}

function Svg6() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="SVG">
          <path d={svgPaths.p29efa600} id="Vector" stroke="var(--stroke-0, #4A4A4A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
          <path d={svgPaths.p3042bc80} id="Vector_2" stroke="var(--stroke-0, #4A4A4A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['PingFang_TC:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4a4a4a] text-[14px] text-center text-nowrap">
        <p className="leading-[20px] whitespace-pre">過濾未讀</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[6px] items-center px-[13px] py-[7px] relative rounded-[6px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-neutral-200 border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Svg6 />
      <Container24 />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Container">
      <Button5 />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Container">
      <Container23 />
      <Container25 />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <Container16 />
      <Container19 />
      <Container26 />
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="h-[211px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[211px] items-start pb-[17px] pt-[8px] px-[16px] relative w-full">
          <Container27 />
        </div>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['PingFang_TC:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-center text-gray-500 text-nowrap">
        <p className="leading-[28px] whitespace-pre">沒有對話</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['PingFang_TC:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-gray-500 text-nowrap">
        <p className="leading-[20px] whitespace-pre">當有新訊息時，對話會出現在這裡</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Container">
      <Container28 />
      <Container29 />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex h-[272px] items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Container30 />
    </div>
  );
}

function BackgroundVerticalBorder() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col h-full items-start max-w-[320px] min-w-[320px] pl-0 pr-px py-0 relative shrink-0 w-[320px]" data-name="Background+VerticalBorder">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-neutral-200 border-solid inset-0 pointer-events-none" />
      <HorizontalBorder />
      <Container31 />
    </div>
  );
}

function Container32() {
  return (
    <div className="basis-0 content-stretch flex grow items-center justify-center min-h-px min-w-px relative shrink-0 w-full" data-name="Container">
      <div className="basis-0 flex flex-col font-['PingFang_TC:Regular',sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-center text-gray-500">
        <p className="leading-[24px]">請選擇一個對話</p>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="basis-0 bg-white content-stretch flex flex-col grow h-full items-start justify-center min-h-px min-w-px overflow-clip relative shrink-0" data-name="Background">
      <Container32 />
    </div>
  );
}

function Main() {
  return (
    <div className="content-stretch flex h-[490px] items-start max-w-[944px] overflow-clip relative shrink-0 w-full" data-name="Main">
      <BackgroundVerticalBorder />
      <Background1 />
    </div>
  );
}

export default function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Container">
      <Header />
      <Main />
    </div>
  );
}