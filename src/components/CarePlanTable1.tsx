  return (
    <div id="table1" className="max-w-[1600px] mx-auto min-w-[1200px] overflow-x-auto">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="p-8 space-y-8">
          <div className="border-b border-[#191970]">
            <h2 className="text-xl font-semibold text-[#191970] mb-4">第1表</h2>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {['利用者の意向', '家族の意向'].map((column) => (
              <div key={column} className="space-y-4">
                <h3 className="text-lg font-semibold text-[#191970]">{column}</h3>
                <div className="border border-[#191970] rounded-lg p-4 min-h-[200px]">
                  <textarea
                    className="w-full h-full p-2 border border-[#191970] rounded focus:outline-none focus:ring-2 focus:ring-[#191970] focus:border-transparent resize-none"
                    placeholder={`${column}を入力してください`}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#191970]">課題分析の結果</h3>
            <div className="border border-[#191970] rounded-lg p-4 min-h-[200px]">
              <textarea
                className="w-full h-full p-2 border border-[#191970] rounded focus:outline-none focus:ring-2 focus:ring-[#191970] focus:border-transparent resize-none"
                placeholder="課題分析の結果を入力してください"
              />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#191970]">総合的な援助の方針</h3>
            <div className="border border-[#191970] rounded-lg p-4 min-h-[200px]">
              <textarea
                className="w-full h-full p-2 border border-[#191970] rounded focus:outline-none focus:ring-2 focus:ring-[#191970] focus:border-transparent resize-none"
                placeholder="総合的な援助の方針を入力してください"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ); 