"use client";
import React from "react";

import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface PaginationWrapperProps {
  totalPages?: number;
  currentPage: number;
  roomId?: string | null;
  onPageChange?: (page: number) => void;
  disabled?: boolean;
  search?: string;
  category?: string;
}

function PaginationWrapper(props: PaginationWrapperProps) {
  let paramsStr = '';
  if (props.roomId) paramsStr += `&room=${props.roomId}`;
  if (props.search) paramsStr += `&search=${encodeURIComponent(props.search)}`;
  if (props.category) paramsStr += `&category=${encodeURIComponent(props.category)}`;

  return (
    <>
      <Pagination>
        <PaginationContent>
          {props.currentPage != 1 && (
            <PaginationItem>
              <PaginationPrevious href={`?page=${props.currentPage - 1}${paramsStr}`} />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink href={`?page=${props.currentPage}${paramsStr}`}>{props.currentPage}</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          {props.currentPage < (props.totalPages || 1) && (
            <PaginationItem>
              <PaginationNext href={`?page=${props.currentPage + 1}${paramsStr}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  );
}

export default PaginationWrapper;
