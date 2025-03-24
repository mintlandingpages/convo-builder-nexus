
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Define the days of the week
const daysOfWeek = [
  { id: 'monday', label: 'Monday' },
  { id: 'tuesday', label: 'Tuesday' },
  { id: 'wednesday', label: 'Wednesday' },
  { id: 'thursday', label: 'Thursday' },
  { id: 'friday', label: 'Friday' },
  { id: 'saturday', label: 'Saturday' },
  { id: 'sunday', label: 'Sunday' },
];

// Create times for dropdown
const createTimeOptions = () => {
  const times = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hour = h.toString().padStart(2, '0');
      const minute = m.toString().padStart(2, '0');
      times.push(`${hour}:${minute}`);
    }
  }
  return times;
};

const timeOptions = createTimeOptions();

const formSchema = z.object({
  practiceName: z.string().min(1, { message: "Practice name is required" }),
  streetAddress: z.string().min(1, { message: "Street address is required" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  whatsappNumber: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  website: z.string().url({ message: "Invalid URL" }).optional(),
  openingDays: z.record(z.string(), z.object({
    isOpen: z.boolean(),
    startTime: z.string(),
    endTime: z.string()
  })),
  takesOnlineBookings: z.enum(["yes", "no"]),
  onlineBookingUrl: z.string().url({ message: "Invalid URL" }).optional(),
  googleMapsLink: z.string().url({ message: "Invalid URL" }).optional(),
  findPractice: z.string().optional(),
  hasParking: z.enum(["yes", "no"]),
  usp: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ChatbotBasicDetails: React.FC = () => {
  const [selectedType, setSelectedType] = useState("type1");
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  
  // Initialize opening days state
  const initialOpeningDays = daysOfWeek.reduce((acc, day) => {
    acc[day.id] = { isOpen: false, startTime: "09:00", endTime: "17:00" };
    return acc;
  }, {} as Record<string, { isOpen: boolean; startTime: string; endTime: string }>);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      practiceName: "",
      streetAddress: "",
      phoneNumber: "",
      whatsappNumber: "",
      email: "",
      website: "",
      openingDays: initialOpeningDays,
      takesOnlineBookings: "no",
      onlineBookingUrl: "",
      googleMapsLink: "",
      findPractice: "",
      hasParking: "no",
      usp: "",
    },
  });
  
  const watchTakesOnlineBookings = form.watch("takesOnlineBookings");
  
  return (
    <div className="p-6 chatbot-card">
      <Form {...form}>
        <form className="space-y-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="practiceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Practice Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter practice name" 
                      className="input-with-animation"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Practice Street Address</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter street address" 
                      className="input-with-animation"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Practice Phone Number</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter phone number" 
                      className="input-with-animation"
                      type="tel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="whatsappNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Practice WhatsApp Number</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter WhatsApp number" 
                      className="input-with-animation"
                      type="tel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Practice Email Address</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter email address" 
                      className="input-with-animation"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Practice Website</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter website URL" 
                      className="input-with-animation"
                      type="url"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-4">
              <Label>Practice Opening Days and Times</Label>
              {daysOfWeek.map((day) => (
                <div key={day.id} className="flex items-center space-x-4">
                  <FormField
                    control={form.control}
                    name={`openingDays.${day.id}.isOpen`}
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox 
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="w-24">{day.label}</FormLabel>
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex items-center space-x-2 flex-1">
                    <FormField
                      control={form.control}
                      name={`openingDays.${day.id}.startTime`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <select
                              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                              {...field}
                              disabled={!form.watch(`openingDays.${day.id}.isOpen`)}
                            >
                              {timeOptions.map((time) => (
                                <option key={time} value={time}>
                                  {time}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <span>to</span>
                    <FormField
                      control={form.control}
                      name={`openingDays.${day.id}.endTime`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <select
                              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                              {...field}
                              disabled={!form.watch(`openingDays.${day.id}.isOpen`)}
                            >
                              {timeOptions.map((time) => (
                                <option key={time} value={time}>
                                  {time}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <FormField
              control={form.control}
              name="takesOnlineBookings"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Does The Practice Take Online Bookings?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel>Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel>No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {watchTakesOnlineBookings === "yes" && (
              <FormField
                control={form.control}
                name="onlineBookingUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Online Booking URL</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter online booking URL" 
                        className="input-with-animation"
                        type="url"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <FormField
              control={form.control}
              name="googleMapsLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Google Maps Link For Dental Practice</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter Google Maps URL" 
                      className="input-with-animation"
                      type="url"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="findPractice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How to find the practice</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Provide information on how to find the practice"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="hasParking"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Is there parking available at the practice?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel>Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel>No</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="usp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Practice Unique Selling Points</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter practice unique selling points"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Chatbot Type
              </Label>
              <ToggleGroup 
                type="single" 
                variant="outline"
                value={selectedType}
                onValueChange={(value) => {
                  if (value) setSelectedType(value);
                }}
                className="flex gap-2"
              >
                <ToggleGroupItem 
                  value="type1" 
                  className="rounded-md border border-muted px-3 py-2 data-[state=on]:bg-primary data-[state=on]:text-white data-[state=on]:border-primary transition-all duration-300"
                >
                  Type 1
                </ToggleGroupItem>
                <ToggleGroupItem 
                  value="type2" 
                  className="rounded-md border border-muted px-3 py-2 data-[state=on]:bg-primary data-[state=on]:text-white data-[state=on]:border-primary transition-all duration-300"
                >
                  Type 2
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Color Picker
              </Label>
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-full border border-gray-200 cursor-pointer overflow-hidden relative"
                  style={{ backgroundColor: selectedColor }}
                  onClick={() => document.getElementById('colorPicker')?.click()}
                >
                  <input 
                    type="color"
                    id="colorPicker"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                </div>
                <span className="text-sm text-muted-foreground">{selectedColor}</span>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChatbotBasicDetails;
