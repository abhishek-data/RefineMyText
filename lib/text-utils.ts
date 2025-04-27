export const calculateTextStats = (text: string) => {
  return {
    wordCount: text.trim().split(/\s+/).filter(Boolean).length,
    charCount: text.length,
  };
};

export const downloadText = (text: string, filename: string = 'refined-text.txt') => {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};