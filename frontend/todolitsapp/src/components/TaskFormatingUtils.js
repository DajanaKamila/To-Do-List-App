export function getPriorityInfo(task) {
    let badge= '';
  
    if (task.priority === "High & Urgent") {
      badge = 'custom-bg-high-urgent';
    } else if (task.priority === "High & Not Urgent") {
      badge = 'custom-bg-high-not-urgent';
    } else if (task.priority === "Low & Urgent") {
      badge = 'custom-bg-low-urgent';
    } else if (task.priority === "Low & Not Urgent") {
      badge = 'custom-bg-low-not-urgent';
    } 
    return badge;
}

export function getDeadlineStyle(deadline) {
  const today = new Date();
  const deadlineDate = new Date(deadline);

  const diffInDays = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));

  let style = '';

  if (diffInDays >= 2 && diffInDays <= 4) {
      style = 'deadline-warning';
  } else if (diffInDays === 1 || (deadlineDate.getDate() === today.getDate() && deadlineDate.getMonth() === today.getMonth() && deadlineDate.getFullYear() === today.getFullYear()) || deadlineDate < today) {
      style = 'deadline-danger';
  } else {
    style = 'deadline-calm';
  }

  return style;
}