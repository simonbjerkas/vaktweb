"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TextEditor } from "@/components/text-editor";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { Combobox } from "@/components/combobox";
import { toast } from "sonner";

const newReportSchema = z.object({
  body: z.string().min(1, "Report content is required"),
  locationId: z.string().min(1, "Location is required"),
  hallId: z.optional(z.string().min(1)),
  tags: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof newReportSchema>;

export default function NewReportForm() {
  const [open, setOpen] = useState(false);
  const locations = useQuery(api.locations.getLocations);
  const halls = useQuery(api.halls.getAllHalls);
  const tags = useQuery(api.tags.getTagByType, { type: "report" }) ?? [];
  const createReport = useMutation(api.reports.createReport);

  const form = useForm<FormData>({
    resolver: zodResolver(newReportSchema),
    defaultValues: {
      body: "",
      locationId: "",
      hallId: undefined,
      tags: undefined,
    },
  });

  const locationId = form.watch("locationId");
  const locationHalls =
    halls?.filter((hall) => hall.location === locationId) ?? [];

  useEffect(() => {
    form.setValue("hallId", "");
  }, [locationId, form]);

  async function onSubmit(values: FormData) {
    await createReport({
      locationId: values.locationId as Id<"locations">,
      hallId: values.hallId as Id<"halls">,
      tags: values.tags as Id<"tags">[],
      body: values.body,
    })
      .then(() => {
        toast.success("Report submitted", {
          description: "Your report has been submitted successfully",
        });
        setOpen(false);
      })
      .catch((error) => {
        toast.error("Something went wrong", {
          description: error.message,
          action: {
            label: "Try again",
            onClick: () => {
              onSubmit(values);
            },
          },
        });
      });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create new report</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create new report</DialogTitle>
          <DialogDescription>
            Submit a new report for a location or hall
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="locationId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locations?.map((location) => (
                          <SelectItem key={location._id} value={location._id}>
                            {location.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Select the location</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hallId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hall</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a hall" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locationHalls.map((hall) => (
                          <SelectItem key={hall._id} value={hall._id}>
                            {hall.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the hall (optional)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Combobox data={tags} {...field} />
                    </FormControl>
                    <FormDescription>Add relevant tags</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Report Content</FormLabel>
                  <FormControl>
                    <TextEditor menubar {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide detailed information about the situation or issue
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Submit Report</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
