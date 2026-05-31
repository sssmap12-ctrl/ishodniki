const fs = require('fs');
const path = require('path');

const photoDir = path.join(__dirname, 'photo');

const fileMapping = [
  // Easy
  { old: 'photo/обычные/1.jpg', new: 'photo/easy/1.jpg' },
  { old: 'photo/обычные/новая одежда.jpg', new: 'photo/easy/new_clothes.jpg' },
  { old: 'photo/обычные/с душа.jpg', new: 'photo/easy/shower.jpg' },
  { old: 'photo/обычные/селфи с кровати.jpg', new: 'photo/easy/selfie_bed.jpg' },
  
  // Medium
  { old: 'photo/средние/интим в новой кофте 2jpg.jpg', new: 'photo/medium/intime_new_sweater_2.jpg' },
  { old: 'photo/средние/интим в новой кофте.jpg', new: 'photo/medium/intime_new_sweater.jpg' },
  { old: 'photo/средние/интимки.jpg', new: 'photo/medium/intime.jpg' },
  { old: 'photo/средние/на кровате в трусах.jpg', new: 'photo/medium/bed_panties.jpg' },
  { old: 'photo/средние/ножки.jpg', new: 'photo/medium/legs.jpg' },
  { old: 'photo/средние/с душа.jpg', new: 'photo/medium/shower_spicy.jpg' },
  { old: 'photo/средние/с языком.jpg', new: 'photo/medium/tongue.jpg' },
  
  // Hard
  { old: 'photo/хард/интим.jpg', new: 'photo/hard/intime_spicy.jpg' },
  { old: 'photo/хард/интимки Хамари_Мизусима 2.jpg', new: 'photo/hard/intime_hamari_2.jpg' },
  { old: 'photo/хард/интимки Хамари_Мизусима 3.jpg', new: 'photo/hard/intime_hamari_3.jpg' },
  { old: 'photo/хард/интимки Хамари_Мизусима 4.jpg', new: 'photo/hard/intime_hamari_4.jpg' },
  { old: 'photo/хард/интимки Хамари_Мизусима 5.jpg', new: 'photo/hard/intime_hamari_5.jpg' },
  { old: 'photo/хард/интимки Хамари_Мизусима 6.jpg', new: 'photo/hard/intime_hamari_6.jpg' },
  { old: 'photo/хард/интимки Хамари_Мизусима 7.jpg', new: 'photo/hard/intime_hamari_7.jpg' },
  { old: 'photo/хард/интимки Хамари_Мизусима 8.jpg', new: 'photo/hard/intime_hamari_8.jpg' },
  { old: 'photo/хард/интимки Хамари_Мизусима.jpg', new: 'photo/hard/intime_hamari_1.jpg' },
  { old: 'photo/хард/с душа2.jpg', new: 'photo/hard/shower_hard.jpg' }
];

// 1. Physically rename the files and folders
console.log('[Подготовка] Переименование физических папок и файлов...');

// Create new folders first
const newDirs = ['easy', 'medium', 'hard'];
newDirs.forEach(dir => {
  const dirPath = path.join(photoDir, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`[Директория] Создана папка: photo/${dir}`);
  }
});

// Copy files to new destinations
fileMapping.forEach(map => {
  const oldPath = path.join(__dirname, map.old);
  const newPath = path.join(__dirname, map.new);
  
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`[Переименование] ${map.old} -> ${map.new}`);
  } else {
    console.log(`[Внимание] Файл не найден: ${map.old}`);
  }
});

// Delete old empty directories if they exist
const oldDirs = ['обычные', 'средние', 'хард'];
oldDirs.forEach(dir => {
  const dirPath = path.join(photoDir, dir);
  if (fs.existsSync(dirPath)) {
    try {
      fs.rmdirSync(dirPath);
      console.log(`[Очистка] Удалена старая папка: photo/${dir}`);
    } catch (e) {
      console.log(`[Предупреждение] Не удалось удалить папку (возможно, не пуста): photo/${dir}`);
    }
  }
});

// 2. Update references in code files
console.log('\n[Код] Обновление ссылок на файлы в сценарии и HTML...');

const codeFiles = [
  path.join(__dirname, 'js', 'story.js'),
  path.join(__dirname, 'index.html'),
  path.join(__dirname, 'js', 'app.js')
];

codeFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  // Replace old strings with new ones
  fileMapping.forEach(map => {
    // Replace direct path references
    content = content.split(map.old).join(map.new);
  });
  
  // Replace tier string filters inside story or JS if any
  content = content.split('\"easy\"').join('\"easy\"');
  content = content.split('\"medium\"').join('\"medium\"');
  content = content.split('\"hard\"').join('\"hard\"');
  content = content.split('\"обычные\"').join('\"easy\"');
  content = content.split('\"средние\"').join('\"medium\"');
  content = content.split('\"хард\"').join('\"hard\"');
  content = content.split('\'обычные\'').join('\'easy\'');
  content = content.split('\'средние\'').join('\'medium\'');
  content = content.split('\'хард\'').join('\'hard\'');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[Код] Обновлены ссылки в файле: ${path.basename(filePath)}`);
  }
});

console.log('\n[Успех] Все ресурсы переименованы на английские названия для совместимости с Android!');
