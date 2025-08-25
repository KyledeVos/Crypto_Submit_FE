import React from "react";
import type { customToastType } from "../../types/element_types.ts";

export const CustomToastAlert = ({
  toastType,
  message,
  showToast,
  onClose,
}: customToastType) => {
  return (
    <>
      <div
        className={`w-25 toast bg-dark border-${
          toastType === "alert"
            ? "danger"
            : toastType === "info"
            ? "warning"
            : "success"
        } position-absolute top-0 end-0`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{
          display: `${showToast && message !== "" ? "block" : "none"}`,
        }}
      >
        <div className="toast-header bg-dark">
          <h4 className="me-auto text-white">Alert</h4>
          <button
            type="button"
            className="btn-close col-2"
            data-bs-dismiss="toast"
            aria-label="Close"
            onClick={onClose}
          ></button>
        </div>
        <div className="toast-body">{message}</div>
      </div>
    </>
  );
};
