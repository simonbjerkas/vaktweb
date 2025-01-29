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
import { useToast } from "@/components/ui/use-toast";
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
import { useEffect, useMemo } from "react";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Combobox } from "@/components/combobox";
import { ToastAction } from "@/components/ui/toast";

const newReportSchema = z.object({
  body: z.string().min(1, "Report content is required"),
  locationId: z.string().min(1, "Location is required"),
  hallId: z.optional(z.string().min(1)),
  tags: z.array(z.string()).optional(),
});

type FormData = z.infer<typeof newReportSchema>;

export default function NewReportForm() {
  const locations = useQuery(api.locations.getLocations);
  const halls = useQuery(api.halls.getAllHalls);
  const tags = useQuery(api.tags.getTagByType, { type: "report" }) ?? [];

  const createReport = useMutation(api.reports.createReport);

  const { toast } = useToast();

  const hallsByLocation = useMemo(() => {
    const map = new Map<string, Doc<"halls">[]>();

    locations?.forEach((location) => {
      const locationHalls = halls?.filter(
        (hall) => hall.location === location.id,
      );

      map.set(location.id, locationHalls ?? []);
    });

    return map;
  }, [locations, halls]);

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
      .catch((error) => {
        toast({
          title: "Error",
          variant: "destructive",
          description: error.message,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      })
      .then(() => {
        toast({
          title: "Report submitted",
          description: "Your report has been submitted successfully",
        });
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="locationId"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Location</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {locations?.map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the location this report is about
                </FormDescription>
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a hall" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {hallsByLocation
                      ?.get(form.getValues("locationId") ?? "")
                      ?.map((hall) => (
                        <SelectItem key={hall._id} value={hall._id}>
                          {hall.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the location this report is about
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
                  <Combobox tags={tags} {...field} />
                </FormControl>
                <FormDescription>
                  Select the location this report is about
                </FormDescription>
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

        <Button type="submit">Submit Report</Button>
      </form>
    </Form>
  );
}
