import { Request, Response } from "express";
import { readDB, writeDB } from "../storage";
import { User } from "../models/userModel";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { createToken } from "../utils/jwt";

export const signup = async (req: Request, res: Response) => {
  const db = readDB();
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ error: "Username, password, and email are required" });
  }

  const exists = db.users.find((u: User) => u.username === username);
  if (exists) return res.status(400).json({ error: "User exists" });

  const hash = await bcrypt.hash(password, 10);

  const newUser: User = {
    id: crypto.randomUUID(),
    username,
    email: email,
    passwordHash: hash,
    createdAt: new Date().toISOString(),
  };

  db.users.push(newUser);
  writeDB(db);

  res.json({ message: "Signup successful" });
};

export const login = async (req: Request, res: Response) => {
  const db = readDB();
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  const user = db.users.find((u: User) => u.username === username);
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(400).json({ error: "Invalid credentials" });

  const token = createToken(user.id);

  res.json({ token });
};
