# TicTacToe
fullStackTest--Tic tac toe Game on web.

## Start

Download ZIP
Extract file

In VS Code click open folder -- open file that you extracted

then following all setup guid below

## Installation

Install my-project with npm

```bash
  npm init -y
  npm install express mysql
```

## Database

Xampp -- phpmyadmin

Create database name "TicTacToe" then import file "history.sql"

## Download history.sql 

[history.sql](https://drive.google.com/file/d/17em6C6nYMw_U7bJJ-l84x-JNJpBq24Qs/view?usp=sharing)

## PS

Replay function has been add as a last function so it's only work with few of last record and 3x3 board. You can play a new game to check it out.


## Run localhost

http://localhost:3000

```bash
  node server.js
```

## Design and Algorithm

Project XO หรือ Tic Tac Toe เป็นเว็บแอปพลิเคชันที่มีทั้งโหมดผู้เล่นสองคนและโหมดผู้เล่นกับ AI พร้อมระบบประวัติการเล่นที่สามารถดูการเล่นย้อนหลังได้ แนวคิดในการออกแบบและอัลกอริธึมที่ใช้ มีดังนี้

## แนวคิดในการออกแบบ

โครงสร้างเว็บแอปพลิเคชัน

หน้าแรก มีชื่อเกม "Tic Tac Toe" และปุ่มให้เลือกโหมด "vs A.I." และ "2 Player".

หน้าเกม สำหรับทั้งสองโหมด มีบอร์ดเกมขนาด 3x3 เริ่มต้น และ
สามารถเพิ่มขนาดบอร์ดได้ในโหมดผู้เล่นสองคน.

หน้าประวัติการเล่น: แสดงรายการประวัติการเล่นทั้งหมดเรียงตามวันที่และเวลา สามารถคลิกเพื่อดูการเล่นย้อนหลังได้.

การเชื่อมต่อกับฐานข้อมูล

ใช้ mysql เพื่อเก็บข้อมูลประวัติการเล่นของเกม
ตาราง history เก็บข้อมูลผลการเล่น (result), ลำดับการเดิน (moves), และวันที่เวลา (date).

## อัลกอริธึม

การจัดการการเล่นเกม:

การเดินของผู้เล่น 

เมื่อผู้เล่นคลิกที่ช่องในบอร์ด ระบบจะตรวจสอบว่าช่องนั้นว่างหรือไม่ ถ้าว่างก็จะบันทึกการเดินและตรวจสอบว่ามีผู้ชนะหรือไม่...

การเดินของ AI 

AI จะสุ่มเลือกช่องว่างในบอร์ดเพื่อเดินและตรวจสอบว่ามีผู้ชนะหรือไม่ (อันนี้ทำแบบนี้เนื่องจากว่าความรู้ด้านการ train AI ยังไม่มี แล้วถ้าศึกษาเต็ม ๆ น่าจะทำให้ส่งแบบทดสอบนี้ช้าไปอีก ก็เลยทำแบบสุ่ม)...

การตรวจสอบการชนะ 

ตรวจสอบแนวตั้ง แนวนอน และแนวทะแยง เพื่อดูว่ามีผู้เล่นคนใดทำให้เกิดการเรียงกันครบตามจำนวนบอร์ดหรือไม่.

การเพิ่มขนาดบอร์ด (ในโหมดผู้เล่นสองคน):

เมื่อคลิกปุ่ม "Add" ขนาดบอร์ดจะเพิ่มขึ้นทีละ 1 (เช่นจาก 3x3 เป็น 4x4 และเพิ่มไปเรื่อย ๆ).

การบันทึกผลการเล่น:

เมื่อเกมจบลง (มีผู้ชนะหรือเสมอ) ระบบจะบันทึกผลการเล่นและลำดับการเดินทั้งหมดลงในฐานข้อมูล.

ประวัติการเล่น:

เมื่อเข้าไปที่หน้าประวัติ ระบบจะดึงข้อมูลประวัติการเล่นจาก db และแสดงเป็น list.

เมื่อคลิกที่ประวัติ ระบบจะแสดงลำดับการเดินและผลการเล่นจาก db และแสดงการเล่นย้อนหลังบนบอร์ดโดยใช้ setInterval เพื่อทำการแสดงทีละการเดิน.

## Win condition check


    function checkWin() {
    for (let i = 0; i < boardSize; i++) {
    if (board[i].every(cell => cell === currentPlayer) || board.every(row => row[i] === currentPlayer)) {
            return true;
        }
    }
    if (board.every((row, index) => row[index] === currentPlayer) || 
        board.every((row, index) => row[boardSize - index - 1] === currentPlayer)) {
        return true;
    }
    return false;
    }

## Replay 


    function startReplay(moves) {
    document.getElementById('history').classList.add('hidden');
    document.getElementById('replay').classList.remove('hidden');
    const boardSize = Math.sqrt(moves.length);
    createBoard(boardSize);
    let index = 0;
    const interval = setInterval(() => {
          if (index >= moves.length) {
              clearInterval(interval);
              return;
              }
          const { player, row, col } = moves[index];
          board[row][col] = player;
          renderBoard(boardSize);
          index++;
      }, 1000);
      }

## สรุป

Project นี้ใช้แนวคิดการออกแบบที่เน้นการใช้งานง่ายและการแสดงผลที่ชัดเจน โดยมีการเชื่อมต่อกับฐานข้อมูลเพื่อบันทึกและเรียกดูประวัติการเล่น อัลกอริธึมที่ใช้เน้นการจัดการการเดินของผู้เล่น การตรวจสอบการชนะ และการแสดงย้อนหลังของเกม เพื่อให้ผู้ใช้สามารถเล่นเกมและดูประวัติการเล่นได้.










    
