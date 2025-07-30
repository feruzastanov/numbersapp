import React, { useState } from "react";
import NumberForm from "./components/NumberForm";
import NumberResult from "./components/NumberResult";
import { FormData, NumberInfo } from "./types";
import { getNumberInfo, getRandomNumberInfo } from "./services/api";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [numberInfo, setNumberInfo] = useState<NumberInfo | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      let result: NumberInfo;

      if (data.isRandom) {
        result = await getRandomNumberInfo(data.infoType);
      } else {
        result = await getNumberInfo(data.number, data.infoType);
      }

      setNumberInfo(result);
      setFormData(data);
    } catch (err) {
      setError(
        "Произошла ошибка при получении информации. Пожалуйста, попробуйте еще раз."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setNumberInfo(null);
    setFormData(null);
    setError(null);
  };

  if (numberInfo && formData) {
    return (
      <NumberResult
        numberInfo={numberInfo}
        formData={formData}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="App">
      {error && (
        <div className="global-error">
          {error}
          <button onClick={() => setError(null)} className="error-close">
            ✕
          </button>
        </div>
      )}
      <NumberForm onSubmit={handleFormSubmit} isLoading={isLoading} />
    </div>
  );
}

export default App;
