'use client'

import { Badge } from '@pedroaba/components/ui/badge'
import { Button } from '@pedroaba/components/ui/button'
import { Input } from '@pedroaba/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@pedroaba/components/ui/popover'
import { Separator } from '@pedroaba/components/ui/separator'
import { Filter, Search } from 'lucide-react'
import { useState } from 'react'

interface FiltersBarProps {
  languages: string[]
  topics: string[]
  onSearchChange: (search: string) => void
  onLanguageFilter: (language: string | null) => void
  onTopicFilter: (topic: string | null) => void
  searchValue: string
  selectedLanguage: string | null
  selectedTopic: string | null
}

export function FiltersBar({
  languages,
  topics,
  onSearchChange,
  onLanguageFilter,
  onTopicFilter,
  searchValue,
  selectedLanguage,
  selectedTopic,
}: FiltersBarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const activeFiltersCount = [selectedLanguage, selectedTopic].filter(
    Boolean,
  ).length

  const clearAllFilters = () => {
    onLanguageFilter(null)
    onTopicFilter(null)
    onSearchChange('')
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      {/* Search Input */}
      <div className="relative flex-1 min-w-0">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 pr-4"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="relative">
              <Filter className="h-4 w-4 mr-1" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">Filters</h4>
                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllFilters}
                    className="h-6 px-2 text-xs"
                  >
                    Clear all
                  </Button>
                )}
              </div>

              {/* Languages */}
              {languages.length > 0 && (
                <div className="space-y-2">
                  <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Languages
                  </h5>
                  <div className="flex flex-wrap gap-1">
                    {languages.map((language) => (
                      <Badge
                        key={language}
                        variant={
                          selectedLanguage === language
                            ? 'default'
                            : 'secondary'
                        }
                        className="cursor-pointer text-xs hover:bg-primary/20 transition-colors"
                        onClick={() =>
                          onLanguageFilter(
                            selectedLanguage === language ? null : language,
                          )
                        }
                      >
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {languages.length > 0 && topics.length > 0 && <Separator />}

              {/* Topics */}
              {topics.length > 0 && (
                <div className="space-y-2">
                  <h5 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Topics
                  </h5>
                  <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto">
                    {topics.map((topic) => (
                      <Badge
                        key={topic}
                        variant={
                          selectedTopic === topic ? 'default' : 'secondary'
                        }
                        className="cursor-pointer text-xs hover:bg-primary/20 transition-colors"
                        onClick={() =>
                          onTopicFilter(selectedTopic === topic ? null : topic)
                        }
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>

        {/* Active filters display */}
        {(selectedLanguage || selectedTopic) && (
          <div className="flex items-center gap-1 flex-wrap">
            {selectedLanguage && (
              <Badge
                variant="default"
                className="text-xs cursor-pointer hover:bg-primary/80"
                onClick={() => onLanguageFilter(null)}
              >
                {selectedLanguage} ×
              </Badge>
            )}
            {selectedTopic && (
              <Badge
                variant="default"
                className="text-xs cursor-pointer hover:bg-primary/80"
                onClick={() => onTopicFilter(null)}
              >
                {selectedTopic} ×
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
