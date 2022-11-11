interface IInputProps {
  text: string;
  value: any;
  type?: "text" | "number";
  readonly?: boolean;
  className?: string;
  valueChanged?: (value: any) => void;
}

export default function Input(props: IInputProps) {
  return (
    <div
      className={`
      flex flex-col ${props.className}
    `}
    >
      <label className="mb-2">{props.text}</label>
      <input
        onChange={(e) => props.valueChanged?.(e.target.value)}
        className={`
              border border-purple-500 rounded-lg
                focus:outline-none bg-gray-100 px-4 py-2
                ${props.readonly ? "" : "focus:bg-white"}
              `}
        type={props.type ?? "text"}
        value={props.value}
        readOnly={props.readonly}
      />
    </div>
  );
}
