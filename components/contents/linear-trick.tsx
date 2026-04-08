export function LinearTrick() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="border border-gray-700 bg-card-foreground rounded-sm">
        <div
          className="h-[100px] rounded-t-sm"
          style={{
            background: "linear-gradient(90deg, #e63946 50%, #2a9d8f 50%)",
          }}
        ></div>
        <div className="p-5">
          <p className="mb-2">硬边分割</p>
          <p className="text-sm text-gray-400">
            同一位置放两个色标，产生无过渡的硬切分割线，可做颜色块拼接。
          </p>
          <pre>background: linear-gradient(90deg, red 50%, blue 50%)</pre>
        </div>
      </div>

      <div className="border border-gray-70 bg-card-foreground rounded-sm">
        <div
          className="h-[100px] rounded-t-sm"
          style={{
            background:
              "repeating-linear-gradient(45deg, #1a1a2e 0px, #1a1a2e 10px, #e63946 10px, #e63946 20px)",
          }}
        ></div>
        <div className="p-5">
          <p className="mb-2">repeating 等间距条纹</p>
          <p className="text-sm text-gray-400">
            用 repeating-linear-gradient 无限重复，无需 background-size
            即可平铺。
          </p>
          <pre>
            background: repeating-linear-gradient(45deg, #000 0 10px, #e63946
            10px 20px)
          </pre>
        </div>
      </div>

      <div className="border border-gray-70 bg-card-foreground rounded-sm">
        <div
          className="h-[100px] rounded-t-sm text-transparent text-3xl font-bold grid place-content-center"
          style={{
            background: "linear-gradient(90deg, #e63946, #f4a261, #2a9d8f)",
            backgroundClip: "text",
          }}
        >
          渐变文字
        </div>
        <div className="p-5">
          <p className="mb-2">渐变文字</p>
          <p className="text-sm text-gray-400">
            配合 background-clip: text 实现渐变色文字，注意需要设置 color:
            transparent。
          </p>
          <pre>background: linear-gradient(90deg, red, blue)</pre>
        </div>
      </div>

      <div className="border border-gray-70 bg-card-foreground rounded-sm">
        <div
          className="h-[100px] rounded-t-sm"
          style={{
            background:
              "linear-gradient(135deg, #1a1a2e 25%, transparent 25%) -10px 0, linear-gradient(225deg, #1a1a2e 25%, transparent 25%) -10px 0, linear-gradient(315deg, #1a1a2e 25%, transparent 25%), linear-gradient(45deg, #1a1a2e 25%, transparent 25%)",
            backgroundColor: "#e63946",
            backgroundSize: "20px 20px",
          }}
        ></div>
        <div className="p-5">
          <p className="mb-2">几何图案背景</p>
          <p className="text-sm text-gray-400">
            多层 linear-gradient 组合 +
            background-size，可以构造出菱形、三角形等几何图案。
          </p>
          <pre>
            background: linear-gradient(135deg, #000 25%, transparent 25%),{" "}
            <br />
            linear-gradient(45deg, #000 25%, transparent 25%)
          </pre>
        </div>
      </div>
    </div>
  );
}
