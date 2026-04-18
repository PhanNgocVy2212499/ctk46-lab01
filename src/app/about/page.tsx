"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold">Giới thiệu</h1>

      <div className="flex items-center gap-4">
        <Avatar size="lg">
          <AvatarFallback>VY</AvatarFallback>
        </Avatar>
        <div className="text-gray-700 dark:text-gray-300">
          <p>
            Xin chào! Tôi là <strong>Phan Ngọc Vỹ</strong> (MSSV <strong>2212499</strong>),
            sinh viên ngành Công nghệ Thông tin tại Đại học Đà Lạt.
          </p>
        </div>
      </div>

      <Alert>
        <AlertTitle>Mục tiêu nghề nghiệp</AlertTitle>
        <AlertDescription>
          Tôi định hướng theo mảng phát triển phần mềm, đặc biệt là web/app,
          và luôn muốn cải thiện khả năng xây dựng sản phẩm thực tế.
        </AlertDescription>
      </Alert>

      <Accordion type="multiple" className="w-full">
        <AccordionItem value="skills">
          <AccordionTrigger>Kỹ năng</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>JavaScript / TypeScript</li>
              <li>React & Next.JS</li>
              <li>Tailwind CSS</li>
              <li>Git & GitHub</li>
              <li>SQL & PostgreSQL</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="education">
          <AccordionTrigger>Học vấn</AccordionTrigger>
          <AccordionContent>
            <div className="rounded-lg border p-4 text-gray-700 dark:text-gray-300">
              <p className="font-medium">Đại học Đà Lạt</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Cử nhân Công nghệ Thông tin (2022 - 2026)
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="interests">
          <AccordionTrigger>Sở thích</AccordionTrigger>
          <AccordionContent>
            <p className="text-gray-700 dark:text-gray-300">
              Ngoài giờ học và làm dự án, tôi thích chill, chơi game và tìm cảm hứng
              từ các sản phẩm công nghệ mới.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
