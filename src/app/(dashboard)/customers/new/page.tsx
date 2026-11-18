"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import type { CustomerStatus } from "@/lib/data";

type FormValues = {
  name: string;
  email: string;
  company: string;
  plan: "Starter" | "Growth" | "Scale";
  status: CustomerStatus;
};

type FormErrors = Partial<Record<"name" | "email" | "company", string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  company: "",
  plan: "Growth",
  status: "trialing",
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-xs font-medium text-red-600">
      {message}
    </p>
  );
}

export default function NewCustomerPage() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [saved, setSaved] = useState<FormValues | null>(null);

  const set =
    <K extends keyof FormValues>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues((prev) => ({
        ...prev,
        [key]: e.target.value,
      }) as FormValues);
      if (key === "name" || key === "email" || key === "company") {
        setErrors((prev) => ({ ...prev, [key]: undefined }));
      }
    };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors: FormErrors = {};
    if (values.name.trim().length < 2) {
      nextErrors.name = "Enter a name of at least 2 characters.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = "Enter a valid email address, like jane@company.com.";
    }
    if (values.company.trim().length < 2) {
      nextErrors.company = "Enter a company name of at least 2 characters.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    // Mock only. There is no backend, so nothing is saved anywhere.
    setSaved(values);
    setValues(initialValues);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">New customer</h2>
        <p className="text-sm text-muted-foreground">
          Add a customer to the mock data. The form validates in the
          browser, and the result is shown on screen only. Nothing is
          saved.
        </p>
      </div>

      {saved && (
        <Card className="border-emerald-600/40 bg-emerald-50 dark:bg-emerald-950/30">
          <CardHeader>
            <CardTitle>Customer looks valid</CardTitle>
            <CardDescription>
              {saved.name} ({saved.email}) at {saved.company}, {saved.plan}{" "}
              plan, {saved.status}. This is a demo: the customer was not
              saved anywhere. Wire this form to your own API to persist it.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Customer details</CardTitle>
          <CardDescription>
            All fields are required except plan and status, which have
            defaults.
          </CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit} noValidate>
          <CardContent className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                placeholder="Amelia Hart"
                autoComplete="name"
                value={values.name}
                onChange={set("name")}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              <span id="name-error">
                <FieldError message={errors.name} />
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Work email</Label>
              <Input
                id="email"
                type="email"
                placeholder="amelia@northwind.io"
                autoComplete="email"
                value={values.email}
                onChange={set("email")}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              <span id="email-error">
                <FieldError message={errors.email} />
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                placeholder="Northwind"
                autoComplete="organization"
                value={values.company}
                onChange={set("company")}
                aria-invalid={Boolean(errors.company)}
                aria-describedby={
                  errors.company ? "company-error" : undefined
                }
              />
              <span id="company-error">
                <FieldError message={errors.company} />
              </span>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="plan">Plan</Label>
                <select
                  id="plan"
                  value={values.plan}
                  onChange={set("plan")}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-2 focus-visible:outline-ring"
                >
                  <option value="Starter">Starter</option>
                  <option value="Growth">Growth</option>
                  <option value="Scale">Scale</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={values.status}
                  onChange={set("status")}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-2 focus-visible:outline-ring"
                >
                  <option value="trialing">Trialing</option>
                  <option value="active">Active</option>
                  <option value="past_due">Past due</option>
                  <option value="canceled">Canceled</option>
                </select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex items-center gap-3">
            <Button type="submit">Add customer</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setValues(initialValues);
                setErrors({});
                setSaved(null);
              }}
            >
              Reset
            </Button>
            <Link
              href="/customers"
              className="ml-auto text-sm font-medium text-primary underline underline-offset-4"
            >
              Back to customers
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
