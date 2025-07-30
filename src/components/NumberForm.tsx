import React, { useState } from "react";
import { FormData, ErrorState } from "../types";
import "./NumberForm.css";

interface NumberFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

const NumberForm: React.FC<NumberFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<FormData>({
    number: "",
    infoType: "trivia",
    isRandom: false,
  });

  const [error, setError] = useState<ErrorState>({
    hasError: false,
    message: "",
  });

  const validateForm = (): boolean => {
    if (!formData.isRandom && !formData.number.trim()) {
      setError({
        hasError: true,
        message: "Пожалуйста, введите число или выберите случайное число",
      });
      return false;
    }

    if (!formData.isRandom && isNaN(Number(formData.number))) {
      setError({
        hasError: true,
        message: "Число должно быть в виде цифры",
      });
      return false;
    }

    setError({ hasError: false, message: "" });
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (error.hasError) {
      setError({ hasError: false, message: "" });
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      infoType: e.target.value as "math" | "trivia" | "date" | "year",
    }));
  };

  return (
    <div className="number-form-container">
      <h1>Информация о числах</h1>
      <p className="subtitle">
        Узнайте интересные факты о числах с помощью Numbers API
      </p>

      <form onSubmit={handleSubmit} className="number-form">
        <div className="form-group">
          <label className="form-label">Выберите тип информации:</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="infoType"
                value="trivia"
                checked={formData.infoType === "trivia"}
                onChange={handleRadioChange}
              />
              <span>Trivia (Интересные факты)</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="infoType"
                value="math"
                checked={formData.infoType === "math"}
                onChange={handleRadioChange}
              />
              <span>Math (Математические факты)</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="infoType"
                value="date"
                checked={formData.infoType === "date"}
                onChange={handleRadioChange}
              />
              <span>Date (Факты о датах)</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="infoType"
                value="year"
                checked={formData.infoType === "year"}
                onChange={handleRadioChange}
              />
              <span>Year (Факты о годах)</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="isRandom"
              checked={formData.isRandom}
              onChange={handleInputChange}
            />
            <span>Случайное число</span>
          </label>
        </div>

        {!formData.isRandom && (
          <div className="form-group">
            <label htmlFor="number" className="form-label">
              Введите число:
            </label>
            <input
              type="text"
              id="number"
              name="number"
              value={formData.number}
              onChange={handleInputChange}
              placeholder="Например: 42, 100, 2024"
              className="form-input"
              disabled={isLoading}
            />
          </div>
        )}

        {error.hasError && <div className="error-message">{error.message}</div>}

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? "Загрузка..." : "Получить информацию"}
        </button>
      </form>
    </div>
  );
};

export default NumberForm;
