import React from "react";
import { NumberInfo, FormData } from "../types";
import "./NumberResult.css";

interface NumberResultProps {
  numberInfo: NumberInfo;
  formData: FormData;
  onBack: () => void;
}

const NumberResult: React.FC<NumberResultProps> = ({
  numberInfo,
  formData,
  onBack,
}) => {
  const getInfoTypeLabel = (type: string): string => {
    switch (type) {
      case "trivia":
        return "Интересные факты";
      case "math":
        return "Математические факты";
      case "date":
        return "Факты о датах";
      case "year":
        return "Факты о годах";
      default:
        return type;
    }
  };

  const getNumberDisplay = (): string => {
    if (formData.isRandom) {
      return `Случайное число: ${numberInfo.number}`;
    }
    return `Число: ${numberInfo.number}`;
  };

  return (
    <div className="result-container">
      <div className="result-card">
        <div className="result-header">
          <h1>Результат</h1>
          <button onClick={onBack} className="back-button">
            ← Назад
          </button>
        </div>

        <div className="user-input-section">
          <h2>Ваши данные:</h2>
          <div className="input-details">
            <div className="detail-item">
              <span className="detail-label">Тип информации:</span>
              <span className="detail-value">
                {getInfoTypeLabel(formData.infoType)}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Число:</span>
              <span className="detail-value">{getNumberDisplay()}</span>
            </div>
          </div>
        </div>

        <div className="number-info-section">
          <h2>Интересная информация:</h2>
          <div className="number-info-card">
            <div className="number-display">
              <span className="number">{numberInfo.number}</span>
            </div>
            <div className="info-text">
              <p>{numberInfo.text}</p>
            </div>
            <div className="info-meta">
              <span className="info-type">
                {getInfoTypeLabel(numberInfo.type)}
              </span>
              <span className="info-found">
                {numberInfo.found
                  ? "✓ Информация найдена"
                  : "⚠ Информация не найдена"}
              </span>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button onClick={onBack} className="primary-button">
            Новый поиск
          </button>
        </div>
      </div>
    </div>
  );
};

export default NumberResult;
