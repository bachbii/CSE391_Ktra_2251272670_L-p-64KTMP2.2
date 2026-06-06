// C2 Hàm kiểm tra tính hợp lệ của dữ liệu nhập vào Form (Validation)
// Tên Task không trống, không quá 100 kí tự.
function taskValidation(title) {
    const cleanedTitle = title.trim(); // Loại bỏ khoảng trắng thừa ở 2 đầu

    // Kiểm tra xem tên Task có bị trống hay không
    if (cleanedTitle === "") {
        return {
            isValid: false,
            message: "Lỗi: Tên Task không được để trống!",
        };
    }

    // Kiểm tra xem tên Task có dài quá 100 kí tự hay không (Yêu cầu đề bài C2)
    if (cleanedTitle.length > 100) {
        return {
            isValid: false,
            message: "Lỗi: Tên Task không được vượt quá 100 kí tự!",
        };
    }

    // Nếu dữ liệu hợp lệ
    return {
        isValid: true,
        message: "Thành công",
    };
}

// Khai báo các biến trỏ tới các phần tử HTML cần tương tác
const btnOpenForm = document.getElementById("btn-open-form");
const btnCloseForm = document.getElementById("btn-close-form");
const formContainer = document.getElementById("form-container");

const taskForm = document.getElementById("task-form");
const inputTaskTitle = document.getElementById("input-task-title");
const selectTaskPriority = document.getElementById("select-task-priority");
const errorBox = document.getElementById("error-box");
const successBox = document.getElementById("success-box");

// Bắt sự kiện khi nhấn nút "+ Add Task" để mở Form (C1)
if (btnOpenForm) {
    btnOpenForm.addEventListener("click", () => {
        formContainer.classList.remove("d-none"); // Hiện Form lên bằng cách xóa class d-none
        inputTaskTitle.focus(); // Focus con trỏ vào ô nhập liệu
    });
}

// Bắt sự kiện khi nhấn nút "X" để đóng Form (C1)
if (btnCloseForm) {
    btnCloseForm.addEventListener("click", () => {
        formContainer.classList.add("d-none"); // Ẩn Form đi
        clearAlerts(); // Xóa các thông báo lỗi hoặc thành công cũ
    });
}

// Bắt sự kiện submit Form để Validate dữ liệu (C2)
if (taskForm) {
    taskForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Ngăn trình duyệt reload lại trang

        const titleValue = inputTaskTitle.value;
        const priorityValue = selectTaskPriority.value;

        // Gọi hàm validate (C2)
        const validationResult = taskValidation(titleValue);

        // Nếu dữ liệu nhập vào không hợp lệ -> hiển thị thông báo lỗi (C2)
        if (!validationResult.isValid) {
            showError(validationResult.message);
            return;
        }

        // Nếu hợp lệ -> hiển thị thông báo thành công và xóa thông báo lỗi cũ (C2)
        clearAlerts();
        showSuccess(`Đã thêm thành công!\nTask: ${titleValue.trim()}\nPriority: ${priorityValue}`);
        
        // Reset lại ô nhập liệu về rỗng
        inputTaskTitle.value = "";
    });
}

// Hàm hiển thị thông báo lỗi
function showError(message) {
    if (errorBox) {
        errorBox.textContent = message;
        errorBox.classList.remove("d-none");
    }
    if (successBox) {
        successBox.classList.add("d-none");
    }
}

// Hàm hiển thị thông báo thành công
function showSuccess(message) {
    if (successBox) {
        successBox.textContent = message;
        successBox.classList.remove("d-none");
    }
    if (errorBox) {
        errorBox.classList.add("d-none");
    }
}

// Hàm xóa các thông báo trên màn hình
function clearAlerts() {
    if (errorBox) errorBox.classList.add("d-none");
    if (successBox) successBox.classList.add("d-none");
}